import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tyinxeyuiualdebpkbuc.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5aW54ZXl1aXVhbGRlYnBrYnVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzM0MzczNTYsImV4cCI6MTk4OTAxMzM1Nn0.zggESmiz6NlOuoF0SJBcVn1mHCVagYAHbHb-NTWBdf0'

export const client = createClient(supabaseUrl, supabaseKey)