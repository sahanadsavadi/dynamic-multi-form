export interface FormField {
    name: string;
    title: string;
    description?: string;
    errorMessage?: string;
    required: boolean;
    regex?: string;
    minLength?: number;
    maxLength?: number;
    type: 'TEXT' | 'NEW_PASSWORD';
    info?: string;  
    showConfirmPassword?: boolean; 
  }
  
  export interface FormStructure {
    name: string;
    title: string;
    submitLabel: string;
    fields: FormField[];
  }
  
  export interface MultiFormResponse {
    id: string;
    form: FormStructure[];
  }