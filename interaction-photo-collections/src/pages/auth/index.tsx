import Modal from "@/components/Modal/Modal";
import 'bootstrap/dist/css/bootstrap.css';
import styles from '@/styles/Home.module.css';

export default function AuthPage() {
  return (
    <div className="auth-page">
      <div className={styles.header}>
        <button type="button" className="btn btn-info"><a href="/">Photos</a></button>
      </div>
      <Modal /> 
    </div>
  );
}