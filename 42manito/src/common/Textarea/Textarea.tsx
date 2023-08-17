import { Input } from 'antd';
import { TextAreaProps } from 'antd/es/input';
import styles from './Textarea.module.css';

const { TextArea } = Input;

interface Props extends TextAreaProps {}

export default function Textarea({ placeholder, ...props }: Props) {
  return (
    <TextArea
      className={styles.base}
      autoSize={{ minRows: 3, maxRows: 5 }}
      placeholder={placeholder}
      {...props}
    />
  );
}
