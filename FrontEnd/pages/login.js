// pages/login.js
import React, { useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Divider,
  FormControlLabel,
  Checkbox,
  Link
} from '@mui/material';
import { motion } from 'framer-motion';
import Image from 'next/image';

// ✅ Supprime le scroll dès le chargement
export default function Login() {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, []);

  return (
    <Box
      sx={{
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(to right, #004085, #007bff)',
        padding: 2,
      }}
    >
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Paper
            elevation={8}
            sx={{
              borderRadius: 4,
              p: 5,
              textAlign: 'center',
              backgroundColor: '#fff',
              maxHeight: '90vh',
              overflow: 'hidden',
            }}
          >
            <Box display="flex" justifyContent="center" mb={2}>
              <Image src="/logo.jpg" alt="Logo" width={80} height={80} />
            </Box>

            <Typography variant="h5" fontWeight="bold" gutterBottom color="primary">
              Accès sécurisé au tableau de bord
            </Typography>

            <Typography variant="body2" color="text.secondary" gutterBottom>
              Veuillez vous identifier pour continuer
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Box component="form" noValidate>
              <TextField
                fullWidth
                margin="normal"
                label="Adresse Email"
                variant="outlined"
                type="email"
              />
              <TextField
                fullWidth
                margin="normal"
                label="Mot de passe"
                variant="outlined"
                type="password"
              />

              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mt: 1 }}
              >
                <FormControlLabel
                  control={<Checkbox color="primary" />}
                  label="Se souvenir de moi"
                />
                <Link href="#" variant="body2" underline="hover">
                  Mot de passe oublié ?
                </Link>
              </Box>

              <Button
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                sx={{ mt: 3, borderRadius: 2, py: 1.5 }}
              >
                Se connecter
              </Button>
            </Box>

            <Typography variant="caption" display="block" mt={4} color="text.secondary">
              © 2025 Credit mutuel du senegal
            </Typography>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
}
