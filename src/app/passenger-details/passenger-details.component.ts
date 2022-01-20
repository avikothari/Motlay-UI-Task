import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-passenger-details',
  templateUrl: './passenger-details.component.html',
  styleUrls: ['./passenger-details.component.scss']
})
export class PassengerDetailsComponent implements OnInit {
  date_of_journey!: FormControl;
  passengers: any = [];

  error_msg!: string;
  show_btn_text: boolean = true;

  constructor(private sharedService: SharedService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit(): void {
    this.date_of_journey = new FormControl('')

    /**For redirection, after successful booking */
    if(this.sharedService.get('date_of_journey')){
      this.date_of_journey.patchValue(JSON.parse(this.sharedService.get('date_of_journey')))
      this.generateSequence({value: this.date_of_journey.value})
      this.sharedService.remove('date_of_journey')
    }

    this.onResize()

    
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?: any) {
    this.show_btn_text = window.innerWidth > 767
  }

  /**Algorithm to generate the boarding sequence which takes minimum time */
  generateSequence(event: any) {

    this.passengers = []
    const pax_list = JSON.parse(this.sharedService.get('bookings')) ?? []
    let filtered_passengers = pax_list.filter((pax: any) => pax.date_of_journey === this.sharedService.dateFormat(event.value))

    filtered_passengers.sort((a: any, b: any) => (a.seat_no < b.seat_no && a) ? 1 : ((b.seat_no < a.seat_no) ? -1 : 0))

    this.passengers = filtered_passengers

  }

  /**To mark the passenger has arrived */
  markAsArrived(passenger: any) {
    const index = this.passengers.findIndex((pax: any) => pax.seat_no === passenger.seat_no)

    this.passengers[index]['arrival_status'] = true

    let bookings = JSON.parse(this.sharedService.get('bookings') ?? [])

    const ls_index = bookings.findIndex((pax: any) => pax.seat_no === passenger.seat_no)
    bookings[ls_index]['arrival_status'] = true

    this.sharedService.store('bookings',bookings)
  }

  /**To update a booking */
  updateBooking(passenger:any){
    this.router.navigate([''])

    this.sharedService.store('booking_id',btoa(passenger.booking_id))
  }
}
