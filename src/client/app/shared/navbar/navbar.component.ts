import { Component } from '@angular/core';
import { NgClass } from '@angular/common';

/**
 * This class represents the navigation bar component.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css'],
})
export class NavbarComponent {
  public currentTab: number = 0;

  public changeTab(n: number) {
    this.currentTab = n;
  }

  public isCurrentTab(n: number): boolean {
    return this.currentTab === n;
  }

}
