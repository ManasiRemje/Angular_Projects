import { Component, OnInit, ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { Router } from '@angular/router';
import { FileService } from '../file.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-folders',
  templateUrl: './folders.component.html',
  styleUrls: ['./folders.component.scss']
})
export class FoldersComponent implements OnInit {
  addEventSubscription!: Subscription;

  constructor(private route: Router, private fileService: FileService) {
    this.addEventSubscription = 
    this.fileService.getAddEvent().subscribe((e) => {
      this.getFolders();
    })
  }

  ngOnInit(): void {
    this.getFolders();
  }

  // 'menu' is viewchild name of choice
  // menu is ref name of choice
  // ElementRef id used to get the element

  @ViewChildren('menu') menu!: QueryList<ElementRef>

  folders: any = []

  getFolders() {
    this.fileService.apiGetFolders().subscribe((response: any) => {
      this.folders = response.data;
      console.log(this.folders);
      if(this.folders.length == 0){
        alert('No folders created');
      }
    })
  }

  deleteFolder(folder: string) {
    console.log(folder);
    const obj = {folderName: folder};
    this.fileService.apiDeleteFolder(obj).subscribe((response: any) => {
      alert('Folder Deleted');
      this.getFolders();
    })
  }

  routeToFiles(folder: string) {
    this.route.navigate(['files', folder]);
  }

  onRightClick(e: any, index: number) {
    e.preventDefault();
    
    const menu: any = this.menu.get(index);
    menu.nativeElement.style.position = "absolute";
    menu.nativeElement.style.display = "block";
    menu.nativeElement.style.top = e.pageY + "px";
    menu.nativeElement.style.left = e.pageX + "px";
  }

  removeMenu() {
    this.menu.forEach((m) => {
      m.nativeElement.style.display = "none";
    })
  }

}
