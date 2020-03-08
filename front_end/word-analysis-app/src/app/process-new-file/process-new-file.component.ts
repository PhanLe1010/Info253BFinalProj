import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {FileProcessService } from "../file-process.service";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-process-new-file',
  templateUrl: './process-new-file.component.html',
  styleUrls: ['./process-new-file.component.css']
})
export class ProcessNewFileComponent implements OnInit {
  newFileForm: FormGroup;

  title: string;
  original_text: string;
  isLoadingResults = false;
  top_25_words: Array<string>;


  constructor(
    private fileProcessService: FileProcessService,
    private formBuilder: FormBuilder,
    public snackbar: MatSnackBar,
  ) {
    this.createForm();
  }

  createForm() {
    this.newFileForm = this.formBuilder.group({
      file: [null, Validators.required],
      stop_word: [false, Validators.required]
    });
  }

  onSubmit(formGroup: FormGroup) {
    this.isLoadingResults = true;
    this.fileProcessService.upload_file(this.title, this.original_text, formGroup.value.stop_word)
    .subscribe(
      response => {
        this.snackbar.open(
          "Successfully process the file! See below for the report. ",
          "",
          { duration: 4000, verticalPosition: 'top', panelClass: ['sucess-snackbar'] }
        );

        let response_cast = response as any;
        console.log(response);
        this.title = response_cast.title;
        this.original_text = response_cast.original_text;
        this.top_25_words = response_cast.top_25_words;
        localStorage.setItem('user_id',response_cast.user_id)
        this.isLoadingResults = false;
      },
      error => {
        this.snackbar.open(
          "Error! Can not process the file.",
          "",
          { duration: 5000, verticalPosition: 'top', panelClass: ['error-snackbar'] }
        );
        console.log(error);
        this.isLoadingResults = false;
      }
    );
  }

  readFile(input: any) {
    const file = input.target.files[0] as File;
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      this.title = file.name;
      this.original_text = reader.result.toString();
    };
    reader.onerror = () => {
      console.log(reader.error);
    };

  }


  ngOnInit(): void {
  }

}


