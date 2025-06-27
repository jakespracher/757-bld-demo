-- Create haikus table
CREATE TABLE IF NOT EXISTS haikus (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    haiku TEXT NOT NULL,
    traffic_status TEXT NOT NULL CHECK (traffic_status IN ('clear', 'moderate', 'heavy')),
    current_speed TEXT NOT NULL,
    free_flow_speed TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on created_at for efficient ordering
CREATE INDEX IF NOT EXISTS idx_haikus_created_at ON haikus(created_at DESC);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_haikus_updated_at 
    BEFORE UPDATE ON haikus 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE haikus ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (since this is a public app)
CREATE POLICY "Allow all operations on haikus" ON haikus
    FOR ALL USING (true);

-- Insert a sample haiku for testing (optional)
-- INSERT INTO haikus (haiku, traffic_status, current_speed, free_flow_speed, description)
-- VALUES (
--     'Traffic flows like time\nEach car a moment passing\nHRBT waits for none',
--     'moderate',
--     '35 mph',
--     '55 mph',
--     'Moderate traffic - some delays'
-- ); 