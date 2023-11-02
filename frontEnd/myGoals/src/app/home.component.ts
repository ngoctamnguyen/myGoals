import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
          <img class="imagebox"
            src="https://www.ericorland.com/wp-content/uploads/2017/04/goalsetting.png"
          />
  `,
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
