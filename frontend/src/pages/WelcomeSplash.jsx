import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/** Change this to your preferred motivational line. */
export const WELCOME_MOTIVATION =
  'Consistency beats cramming. Show up today — your future rank will thank you.';

const HOLD_MS = 2800;
const EXIT_MS = 750;
const ACCENT_DURATION_MS = HOLD_MS + EXIT_MS;

const WelcomeSplash = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [phase, setPhase] = useState('in');

  useEffect(() => {
    const exitTimer = setTimeout(() => setPhase('out'), HOLD_MS);
    const doneTimer = setTimeout(() => {
      navigate('/', { replace: true });
    }, HOLD_MS + EXIT_MS);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [navigate]);

  return (
    <div
      className={`welcome-splash welcome-splash--${phase}`}
      style={{ '--welcome-accent-duration': `${ACCENT_DURATION_MS}ms` }}
      aria-live="polite"
    >
      <div className="welcome-splash__glow" aria-hidden />
      <div className="welcome-splash__content">
        {user?.name && (
          <p className="welcome-splash__greeting">Welcome back, {user.name}</p>
        )}
        <p className="welcome-splash__line">{"कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥"}</p>
        <div className="welcome-splash__accent" aria-hidden />
      </div>
    </div>
  );
};


export default WelcomeSplash;
