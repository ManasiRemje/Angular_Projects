import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.scss']
})
export class TrainerComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }


  logout(){
    localStorage.removeItem("token");
    this.router.navigate(['login']);
  }
}
