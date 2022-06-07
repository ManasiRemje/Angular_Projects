import { Component, OnInit, ViewChild } from '@angular/core';
import { IStudents, IRoles, IRatings, IUpdationData, IData, IAssignedTracks, ITracks, ITrackData, IFilter } from './all-students';
import { FilterService } from '../filter.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  constructor(private filterApi: FilterService, private router: Router, private dialog: MatDialog) { }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngOnInit(): void {
    this.getTracks();
    this.getAllStudents();
  }
  ngAfterViewInit() {

  }

  displayedColumns: string[] = ['Name', 'Age', 'Email', 'Track', 'Logical', 'Communication', 'Assignment', 'Proactiveness', 'Options'];
  students!: MatTableDataSource<IData>;

  filterForm = new FormGroup({
    rating: new FormControl(''),
    track: new FormControl('')
  });

  getAllStudents() {
    this.filterApi.apiAllStudents().subscribe((response: IStudents) => {
      this.students = new MatTableDataSource(response.data);
      this.students.paginator = this.paginator;
    })
  }

  updateStudent(id: string) {
    this.router.navigate(['/trainer/update', id]);
  }

  studentHistory(id: string) {
    this.router.navigate(['/trainer/history', id]);
  }

  onSubmit() {
    this.applyFilter(this.filterForm.value);
  }

  applyFilter(data: IFilter) {
    this.filterApi.apiApplyFilter(data).subscribe((response: IStudents) => {
      if (response.data == null) {
        alert('No student found corresponding to the entered filters');
        // const dialogref = this.dialog.open(DialogElementsExampleDialog);

        // dialogref.afterClosed().subscribe((res: any) => {
        //   console.log(res);

        // });
      }
      this.students = new MatTableDataSource(response.data);
      this.students.paginator = this.paginator;
    })
  }

  tracksReceived: ITrackData[] = [];
  selectedTrack = '';
  selectedRating = '';
  ratingPossible: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  getTracks() {
    this.filterApi.apiTracks().subscribe((response: ITracks) => {
      this.tracksReceived = response.data;
    })
  }
}

// @Component({
//   selector: 'dialog-elements-example-dialog',
//   templateUrl: './dialog-elements-example-dialog.html',
// })
// export class DialogElementsExampleDialog {

//   constructor(private dialogRef: MatDialogRef<DialogElementsExampleDialog>) {

//   }

//   onClose() {
//     this.dialogRef.close();
//   }
// }