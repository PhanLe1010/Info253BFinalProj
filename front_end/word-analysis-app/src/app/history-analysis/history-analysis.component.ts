import { Component, OnInit } from '@angular/core';
import {FileProcessService } from "../file-process.service";

@Component({
  selector: 'app-history-analysis',
  templateUrl: './history-analysis.component.html',
  styleUrls: ['./history-analysis.component.css']
})
export class HistoryAnalysisComponent implements OnInit {
  created: string;
  title: string;
  original_text: string;
  top_25_words: Array<string>;
  stop_word: string;
  file_id: number;
  history: Array<any>;
  constructor(private fileProcessService: FileProcessService) { }

  ngOnInit(): void {
    let user_id = localStorage.getItem('user_id');
    if (user_id){
      this.fileProcessService.get_last_ten_files(user_id)
      .subscribe(
        response => {

          let response_cast = response as any;
          this.history = response_cast.analysises
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  select_file(file_id: string){
    this.history.forEach(file => {
      if(file.id == file_id){
        this.created = file.created;
        this.title = file.title;
        this.original_text = file.original_text;
        this.stop_word = file.stop_word == 1 ? 'Yes' : 'No';
        this.file_id = file.id;
        this.top_25_words = this.convert_string_to__word_array(file.top_25_words);
      }
    });
  }

  // take in a string of 25 words and convert it into an array
  convert_string_to__word_array(top_25_words: string){
    top_25_words = top_25_words.replace(/\[|\]|\(|\)|'| /g, '');
    let top_25_words_arr = top_25_words.split(',');
    let res = []
    for (let i = 0; i < top_25_words_arr.length - 1; i = i + 2){
      res.push([top_25_words_arr[i], top_25_words_arr[i+1]]);
    }
    return res
  }



}


