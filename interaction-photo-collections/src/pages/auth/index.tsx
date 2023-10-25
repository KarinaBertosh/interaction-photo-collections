import Form from "@/components/Form/Form";
import styles from '@/styles/Home.module.css';
import 'bootstrap/dist/css/bootstrap.css';

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