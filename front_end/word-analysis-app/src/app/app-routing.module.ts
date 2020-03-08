import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProcessNewFileComponent } from './process-new-file/process-new-file.component';
import { HistoryAnalysisComponent } from './history-analysis/history-analysis.component';


const routes: Routes = [
  { path: '', component: ProcessNewFileComponent },
  { path: 'history', component: HistoryAnalysisComponent },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
