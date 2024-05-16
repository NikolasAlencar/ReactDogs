export interface IPhotoGet {
  post_author: number;
  post_type: string;
  post_status: string;
  post_title: string;
  post_content: string;
  files: {
    img: {
      name: string;
      full_path: string;
      type: string;
      tmp_name: string;
      error: number;
      size: number;
    };
  };
  meta_input: {
    peso: string;
    idade: string;
    acessos: number;
  };
}
