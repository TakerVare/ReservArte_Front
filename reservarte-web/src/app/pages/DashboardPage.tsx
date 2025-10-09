import { Calendar } from "@/components/ui/calendar";
//import { Calendar02 } from "@/components/calendar-02";
import Calendar01 from "@/components/calendar-01";
import Calendar02 from "@/components/calendar-02";
import Calendar03 from "@/components/calendar-03";
import Calendar04 from "@/components/calendar-04";
import Calendar05 from "@/components/calendar-05";
import Calendar06 from "@/components/calendar-06";
import Calendar07 from "@/components/calendar-07";
import Calendar08 from "@/components/calendar-08";
import Calendar09 from "@/components/calendar-09";
import Calendar10 from "@/components/calendar-10";
import Calendar11 from "@/components/calendar-11";
import Calendar12 from "@/components/calendar-12";
import Calendar13 from "@/components/calendar-13";
import Calendar14 from "@/components/calendar-14";
import Calendar15 from "@/components/calendar-15";
import Calendar16 from "@/components/calendar-16";
import Calendar17 from "@/components/calendar-17";
import Calendar18 from "@/components/calendar-18";
import Calendar19 from "@/components/calendar-19";
import Calendar20 from "@/components/calendar-20";
import Calendar21 from "@/components/calendar-21";
import Calendar22 from "@/components/calendar-22";
import Calendar23 from "@/components/calendar-23";
import Calendar24 from "@/components/calendar-24";
import Calendar25 from "@/components/calendar-25";
import Calendar26 from "@/components/calendar-26";
import Calendar27 from "@/components/calendar-27";
import Calendar28 from "@/components/calendar-28";
import Calendar29 from "@/components/calendar-29";
import Calendar30 from "@/components/calendar-30";
//import Calendar31 from "@/components/calendar-31";
import Calendar32 from "@/components/calendar-32";
//https://ui.shadcn.com/blocks/calendar
/*
Failed to resolve import "little-date" from "src/components/calendar-31.tsx".

<Card>
          <CardHeader>
            <CardTitle>Calendario-31 - With events slots</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar31 />
          </CardContent>
        </Card>

*/


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const DashboardPage = () => {
  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-6 text-3xl font-bold">Calendario de Reservas</h1>
      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Calendario</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar 
              mode="single"
              className="rounded-md border"
              selected={new Date()}
              onSelect={() => {}}
            />
          </CardContent>
          <CardHeader>
            <CardTitle>Calendario-01 - A simple calendar.</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar01 />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Calendario-02 - Multiple months with single selection.</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar02 />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Calendario-03 - Multiple months with multiple selection.</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar03 />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Calendario-04 - Single month with range selection</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar04 />
          </CardContent>
        </Card>
        <Card>  
          <CardHeader>
            <CardTitle>Calendario-05 - Multiple months with range selection</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar05 />
          </CardContent>
        </Card>
        <Card>
        <CardHeader>
            <CardTitle>Calendario-06 - Range selection with minimum days</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar06 />
          </CardContent>
        </Card>
        <Card>
        <CardHeader>
            <CardTitle>Calendario-07 - Range selection with minimum and maximum days</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar07 />
          </CardContent>
        </Card>
        <Card>
        <CardHeader>
            <CardTitle>Calendario-08 - Calendar with disabled days</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar08 />
          </CardContent>
        </Card>
        <Card>
        <CardHeader>
            <CardTitle>Calendario-09 - Calendar with disabled weekends</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar09 />
          </CardContent>
        </Card>
        <Card>
        <CardHeader>
            <CardTitle>Calendario-10 - Today button</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar10 />
          </CardContent>
        </Card>
        <Card>
        <CardHeader>
            <CardTitle>Calendario-11 - Start and end of month</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar11 />
          </CardContent>
        </Card>
        <Card>
        <CardHeader>
            <CardTitle>Calendario-12 - Localized calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar12 />
          </CardContent>
        </Card>
        <Card>
        <CardHeader>
            <CardTitle>Calendario-13 - With Month and Year Dropdown</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar13 />
          </CardContent>
        </Card>
        <Card>
        <CardHeader>
            <CardTitle>Calendario-14 - With Booked/Unavailable Days</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar14 />
          </CardContent>
        </Card>
        <Card>
        <CardHeader>
            <CardTitle>Calendario-15 - With Week Numbers</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar15 />
          </CardContent>
        </Card>
        <Card>
        <CardHeader>
            <CardTitle>Calendario-16 - With time picker</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar16 />
          </CardContent>
        </Card>
        <Card>
        <CardHeader>
            <CardTitle>Calendario-17 - With time picker inline</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar17 />
          </CardContent>
        </Card>
        <Card>
        <CardHeader>
            <CardTitle>Calendario-18 - Variable size</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar18 />
          </CardContent>
        </Card>
        <Card>
        <CardHeader>
            <CardTitle>Calendario-19 - With presets</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar19 />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Calendario-20 - With time presets</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar20 />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Calendario-21 - Custom days and formatters</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar21 />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Calendario-22 - Date picker</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar22 />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Calendario-23 - Date range picker</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar23 />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Calendario-24 - Date and time picker</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar24 />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Calendario-25 - Date and time range picker</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar25 />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Calendario-26 - Date range picker with time</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar26 />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Calendario-27 - Chart filter</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar27 />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Calendario-28 - Input with date picker</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar28 />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Calendario-29 - Natural language date picker</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar29 />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Calendario-30 - With little-date</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar30 />
          </CardContent>
        </Card>
        
        
        <Card>
          <CardHeader>
            <CardTitle>Calendario-32 - Date picker in a grawer</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar32 />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
