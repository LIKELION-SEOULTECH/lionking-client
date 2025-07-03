import Calendar_2 from "@/assets/about/calendar/calendar_2.svg";
import Calendar_3 from "@/assets/about/calendar/calendar_3.svg";
import Calendar_4 from "@/assets/about/calendar/calender_4.svg";
import Calendar_5 from "@/assets/about/calendar/calender_5.svg";
import Calendar_6 from "@/assets/about/calendar/calender_6.svg";
import Calendar_7 from "@/assets/about/calendar/calender_7.svg";
import Calendar_8 from "@/assets/about/calendar/calender_8.svg";
import Calendar_9 from "@/assets/about/calendar/calender_9.svg";
import Calendar_10 from "@/assets/about/calendar/calender_10.svg";
import Calendar_11 from "@/assets/about/calendar/calender_11.svg";
import Calendar_12 from "@/assets/about/calendar/calender_12.svg";

interface CalendarViewProps {
    month?: number;
}

export default function CalendarView({ month = 2 }: CalendarViewProps) {
    let CalendarSVG;
    switch (month) {
        case 3:
            CalendarSVG = Calendar_3;
            break;
        case 4:
            CalendarSVG = Calendar_4;
            break;
        case 5:
            CalendarSVG = Calendar_5;
            break;
        case 6:
            CalendarSVG = Calendar_6;
            break;
        case 7:
            CalendarSVG = Calendar_7;
            break;
        case 8:
            CalendarSVG = Calendar_8;
            break;
        case 9:
            CalendarSVG = Calendar_9;
            break;
        case 10:
            CalendarSVG = Calendar_10;
            break;
        case 11:
            CalendarSVG = Calendar_11;
            break;
        case 12:
            CalendarSVG = Calendar_12;
            break;
        case 2:
        default:
            CalendarSVG = Calendar_2;
    }
    return (
        <div>
            <CalendarSVG className="block w-full h-auto" preserveAspectRatio="xMidYMid meet" />
        </div>
    );
}
