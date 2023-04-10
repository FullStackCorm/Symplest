import * as React from 'react';
import { formatDate } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useState} from 'react';
import { Grid, Stack } from '@mui/material';

function CalendarComponent () {

    return (
        <div>
             {/* <Stack
                direction='column'
                spacing={2}
            >
                <h1>Your Calendar</h1>

            <div id='calendar'>
                <FullCalendar onChange={setDate} value={date} />
            </div>
            <p className='text-center'>
                <span>Selected Date: {date.toDateString()}</span>
            </p>
            </Stack>     */}

            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                headerToolbar={{
                    left: 'prev, next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                initialView='dayGridMonth'
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={this.state.weekendsVisible}
            // initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
            select={this.handleDateSelect}
            // eventContent={renderEventContent} // custom render function
            // eventClick={this.handleEventClick}
            // eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
            /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
            />
        </div>
    );
}

export default CalendarComponent