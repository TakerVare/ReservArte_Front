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

//https://ui.shadcn.com/blocks/calendar

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
            <CardTitle>Calendario-01</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar01 />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Calendario-02</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar02 />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Calendario-03</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar03 />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Calendario-04</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar04 />
          </CardContent>
        </Card>
        <Card>  
          <CardHeader>
            <CardTitle>Calendario-05</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar05 />
          </CardContent>
        </Card>
        <Card>
        <CardHeader>
            <CardTitle>Calendario-06</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar06 />
          </CardContent>
        </Card>
        <Card>
        <CardHeader>
            <CardTitle>Calendario-07</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar07 />
          </CardContent>
        </Card>
        <Card>
        <CardHeader>
            <CardTitle>Calendario-08</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar08 />
          </CardContent>
        </Card>
        <Card>
        <CardHeader>
            <CardTitle>Calendario-09</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar09 />
          </CardContent>
        </Card>
        <Card>
        <CardHeader>
            <CardTitle>Calendario-10</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar10 />
          </CardContent>
        </Card>
        <Card>
        <CardHeader>
            <CardTitle>Calendario-11</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar11 />
          </CardContent>
        </Card>
        <Card>
        <CardHeader>
            <CardTitle>Calendario-12</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar12 />
          </CardContent>
        </Card>
        <Card>
        <CardHeader>
            <CardTitle>Calendario-13</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar13 />
          </CardContent>
        </Card>
        <Card>
        <CardHeader>
            <CardTitle>Calendario-14</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar14 />
          </CardContent>
        </Card>
        <Card>
        <CardHeader>
            <CardTitle>Calendario-15</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar15 />
          </CardContent>
        </Card>
        
      </div>
    </div>
  );
};
