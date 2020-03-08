import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileProcessService {
  url = 'http://127.0.0.1:5000/api/';

  constructor(private http: HttpClient) {
  }

  upload_file(title: string, original_text: string, stop_word: boolean){
    let user_id = localStorage.getItem('user_id');
    let data = {
      title: title,
      original_text: original_text,
      stop_word: stop_word ? 1 : 0,
      user_id: user_id
    };
    console.log(data);

    const url = this.url + 'new_document';
    const headers = { 'Content-Type' : 'application/json'}
    return this.http.post(url, data, {headers});
  }

  get_last_ten_files(user_id: string){
    const url = this.url + '/las_ten_files/' + user_id;
    return this.http.get(url);
  }
}
