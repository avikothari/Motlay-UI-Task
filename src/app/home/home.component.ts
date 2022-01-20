import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../services/shared.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  selected_seats: any = [];
  error_msg!: string;
  booking_form!: FormGroup;
  today: Date = new Date();

  error_obj = {
    'at_least_one': 'Please select at least one seat',
    'only_six': 'Only 6 seats can be booked for a mobile number'
  }
  is_update: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private sharedService: SharedService,
    private dialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.initForm()
    if (JSON.parse(this.sharedService.get('booking_id'))) {
      this.populateForm()
    }
  }

  initForm() {
    this.booking_form = this.formBuilder.group({
      mobile: ['', [Validators.required]],
      date_of_journey: [this.today, [Validators.required]]
    })
  }

  /**Populate form based on booking seats attached to a booking ID */
  populateForm() {
    this.is_update = true

    const pax_list = JSON.parse(this.sharedService.get('bookings')) ?? []

    let filtered_data = pax_list.filter((el: any) =>
      el.booking_id === atob(JSON.parse(this.sharedService.get('booking_id'))))

    for (let el of filtered_data) {
      this.selected_seats.push({
        seat_no: el.seat_no,
        section: el.section
      })
    }

    this.booking_form.patchValue({
      mobile: filtered_data[0].mobile,
      date_of_journey: this.sharedService.dateUnformat(filtered_data[0].date_of_journey)
    })
  }

  get formControls() {
    return this.booking_form.controls
  }

  /**To select or unselect seats */
  toggleSeatSelection(seat_index: number, column: string) {

    let seat_no = seat_index + 1

    const index = this.selected_seats.findIndex((seat: any) => seat.seat_no === seat_no
      && column === seat.section)

    if (index === -1) {

      if (this.selected_seats.length === 6) {
        this.error_msg = 'Only 6 seats can be booked for a mobile number'
        return
      }

      this.selected_seats.push({
        seat_no: seat_no,
        section: column
      })
    }

    else
      this.selected_seats.splice(index, 1)

  }

  /**TO check if seat is already selected or not */
  isSelected(seat_index: number, column: string) {
    let seat_no = seat_index + 1

    const index = this.selected_seats.findIndex((seat: any) => seat.seat_no === seat_no && column === seat.section)

    if (index === -1)
      return false

    return true
  }

  /**To check if the seat is alreay booked */
  isBooked(seat_index: number, column: string) {
    let seat_no = seat_index + 1

    let bookings = JSON.parse(this.sharedService.get('bookings')) ?? []

    if (bookings) {
      const index = bookings.findIndex((seat: any) => seat.seat_no === seat_no &&
        column === seat.section &&
        seat.date_of_journey === this.sharedService.dateFormat(this.booking_form.get('date_of_journey')?.value))

      if (index === -1) return false

      return true
    }

    return false


  }

  /**To book and update seats */
  bookSeats() {
    if (this.booking_form.invalid) {
      return
    }

    if (this.selected_seats.length === 0) {
      this.error_msg = this.error_obj['at_least_one']
      this.selected_seats = []
      return
    }

    let bookings = []

    if (this.checkBookings()) {
      this.error_msg = this.error_obj['only_six']
      return
    }

    for (let seat of this.selected_seats) {
      bookings.push({
        booking_id: this.generateBookingID(this.booking_form.get('mobile')?.value,
          this.booking_form.get('date_of_journey')?.value),
        mobile: this.booking_form.get('mobile')?.value,
        date_of_journey: this.sharedService.dateFormat(this.booking_form.get('date_of_journey')?.value),
        seat_no: seat.seat_no,
        section: seat.section,
        arrival_status: false
      })
    }

    this.selected_seats = []

    let all_bookings = []

    if (this.is_update) {
      all_bookings = (JSON.parse(this.sharedService.get('bookings')) ?? []).filter((el: any) => el.booking_id !== (atob(this.sharedService.get('booking_id') ?? '')))

      all_bookings = all_bookings.concat(bookings)
    } else {
      all_bookings = (JSON.parse(this.sharedService.get('bookings')) ?? []).concat(bookings)
    }

    this.sharedService.store('bookings', all_bookings)

    const dialogRef = this.dialog.open(DialogComponent, {
      width: window.innerWidth < 767 ? '90%' : '50%',
      data: { bookings: bookings, is_update: this.is_update }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.sharedService.remove('booking_id')
      this.router.navigate(['passenger-details'])

      this.sharedService.store('date_of_journey',
        this.booking_form.get('date_of_journey')?.value)
    });


  }

  generateBookingID(mobile_no: string, date_of_journey: string) {
    // Booking ID Format : Mobile Number - Date of Journey
    return mobile_no.replace('+', '') + '-' + this.sharedService.dateFormat(date_of_journey).split('-').join('')
  }

  /**To check if there are only 6 bookings for a particular mobile number */
  checkBookings() {
    let bookings = JSON.parse(this.sharedService.get('bookings')) ?? []

    let filterd_bookings = bookings.filter((seat: any) =>
      seat.mobile === this.booking_form.get('mobile')?.value &&
      seat.date_of_journey === this.sharedService.dateFormat(this.booking_form.get('date_of_journey')?.value)
    )

    return filterd_bookings.length === 6
  }


}
