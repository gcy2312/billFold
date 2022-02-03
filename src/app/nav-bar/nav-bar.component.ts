import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  @Input()


  navLinks = [
    { path: '/expenses', label: 'Expenses', icon: 'insert_chart_outlined_two_tone' },
    { path: '/calendar', label: 'Calendar', icon: 'event_outlined' },
    { path: '/profile', label: 'Profile', icon: 'account_circle_outlined' },
  ];

  /**
   * constructor for navigation
   * @param router 
   * @param snackBar 
   * @param route 
   */
  constructor(
    public router: Router,
    public snackBar: MatSnackBar,
    public route: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

  /**
   * function to logout user 
   * clear localStorage
   */
  logOut(): void {
    localStorage.clear();
    this.router.navigate(['/welcome']);
    this.snackBar.open('You have successfully logged out!', 'OK', {
      duration: 2000,
    });
  }

}
