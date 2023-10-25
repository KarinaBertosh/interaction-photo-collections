import Form from "@/components/Form/Form";
import 'bootstrap/dist/css/bootstrap.css';
import styles from '@/styles/Home.module.css';

export default function AuthPage() {
  return (
    <div className={styles.authPage}>
      <div className={styles.header}>
        <button type="button" className="btn btn-info"><a href="/">Go to photo</a></button>
      </div>
      <Form /> 
    </div>
  );
}