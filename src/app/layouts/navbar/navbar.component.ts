import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  menu_items = [
    {name: 'Home', route: '/', icon: 'home'},
    {name: 'Passengers', route: '/passenger-details', icon: 'groups'}
  ]
  username: string = '';

  constructor() { 
    this.onResize();

  }

  ngOnInit(): void {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?:any) {
    this.username = window.innerWidth <= 767 ? 'A' : 'Avinash';
  }

}
