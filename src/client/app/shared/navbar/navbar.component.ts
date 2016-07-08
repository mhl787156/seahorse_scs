import { Component } from '@angular/core';
import {NgClass} from '@angular/common';
import { ROUTER_DIRECTIVES } from '@angular/router';

/**
 * This class represents the navigation bar component.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css'],
  directives: [ROUTER_DIRECTIVES, NgClass]
})
export class NavbarComponent {
  public currentTab: number = 0;

  public changeTab(n: number) {
    this.currentTab = n;
    console.log(this.currentTab);
  }

  public isCurrentTab(n: number): boolean {
    return this.currentTab === n;
  }
}
