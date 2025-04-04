import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';
interface AuthFormProps {
  type: 'login' | 'signup';
}
