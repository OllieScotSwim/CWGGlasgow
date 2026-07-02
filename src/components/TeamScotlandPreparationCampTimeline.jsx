import React, { useMemo, useState } from "react";
import {
  CalendarDays,
  Clock,
  Users,
  Waves,
  Camera,
  Dumbbell,
  Utensils,
  ClipboardList,
  MapPin,
  Filter,
  Search,
  HeartPulse,
  Bus,
  CheckCircle2,
  Trophy,
  Info,
} from "lucide-react";
import { Button } from "./ui/button";

const campDays = [
  {
    id: "wed-15",
    tab: "Wed 15",
    date: "Wednesday 15 July",
    shortDate: "15 Jul",
    theme: "Arrival + Settle In",
    summary: "Arrivals, hotel check-in, welcome briefing and light pool familiarisation.",
    activities: [
      { time: "10:00", end: "13:00", title: "Team arrivals and hotel check-in", type: "Logistics", location: "Team hotel", involved: ["Athletes", "Coaches", "Team Manager", "Support Staff"], details: "Staggered arrivals, rooming, kit issue and confirmation of dietary requirements." },
      { time: "13:00", end: "14:00", title: "Lunch", type: "Meal", location: "Hotel dining", involved: ["All Team"], details: "Informal arrival lunch and chance to settle in." },
      { time: "14:30", end: "15:15", title: "Welcome briefing", type: "Briefing", location: "Team room", involved: ["All Team"], details: "Camp aims, expectations, schedule overview, key contacts and ways of working." },
      { time: "16:00", end: "17:00", title: "Light pool familiarisation", type: "Swim", location: "Pool", involved: ["Swimmers", "Coaches", "Physio"], details: "Easy loosen swim and familiarisation with the training environment." },
      { time: "18:30", end: "19:30", title: "Dinner", type: "Meal", location: "Hotel dining", involved: ["All Team"], details: "Final reminders for the first full training day." },
    ],
  },
  {
    id: "thu-16",
    tab: "Thu 16",
    date: "Thursday 16 July",
    shortDate: "16 Jul",
    theme: "Training Rhythm",
    summary: "First full training day with swim, activation and initial media content.",
    activities: [
      { time: "07:30", end: "08:15", title: "Breakfast", type: "Meal", location: "Hotel dining", involved: ["All Team"], details: "Standard breakfast window before morning training." },
      { time: "09:00", end: "10:45", title: "Pool session 1", type: "Swim", location: "Pool", involved: ["Swimmers", "Coaches", "Physio"], details: "Technical focus, starts and turns, and individual race preparation work." },
      { time: "11:15", end: "12:30", title: "Media block A", type: "Media", location: "Media room", involved: ["Selected Athletes", "Media Team", "Team Manager"], details: "Headshots, team content, short-form video and interview clips." },
      { time: "13:00", end: "14:00", title: "Lunch", type: "Meal", location: "Hotel dining", involved: ["All Team"], details: "Recovery nutrition and downtime." },
      { time: "15:30", end: "16:30", title: "Gym / activation", type: "S&C", location: "Gym", involved: ["Swimmers", "S&C", "Physio"], details: "Individualised activation, mobility and prehab work." },
      { time: "18:30", end: "19:30", title: "Dinner", type: "Meal", location: "Hotel dining", involved: ["All Team"], details: "Evening check-ins available with staff." },
    ],
  },
  {
    id: "fri-17",
    tab: "Fri 17",
    date: "Friday 17 July",
    shortDate: "17 Jul",
    theme: "Race Prep + Media",
    summary: "Quality pool work, athlete check-ins and remaining media requirements.",
    activities: [
      { time: "07:30", end: "08:15", title: "Breakfast", type: "Meal", location: "Hotel dining", involved: ["All Team"], details: "Standard breakfast window." },
      { time: "09:00", end: "11:00", title: "Pool session 2", type: "Swim", location: "Pool", involved: ["Swimmers", "Coaches", "Physio"], details: "Race-specific skills, pace work, starts and turns." },
      { time: "11:30", end: "12:30", title: "1:1 performance check-ins", type: "Meeting", location: "Team room", involved: ["Athletes", "Coaches", "Performance Staff"], details: "Short athlete-specific prep conversations and support needs." },
      { time: "13:00", end: "14:00", title: "Lunch", type: "Meal", location: "Hotel dining", involved: ["All Team"], details: "Recovery and downtime after lunch." },
      { time: "15:00", end: "16:30", title: "Media block B", type: "Media", location: "Media room", involved: ["Selected Athletes", "Media Team"], details: "Remaining interviews, social content and team assets." },
      { time: "17:00", end: "17:45", title: "Recovery swim / mobility", type: "Recovery", location: "Pool / Gym", involved: ["Optional Athletes", "Physio", "Coaches"], details: "Optional session based on individual athlete plans." },
    ],
  },
  {
    id: "sat-18",
    tab: "Sat 18",
    date: "Saturday 18 July",
    shortDate: "18 Jul",
    theme: "Team Connection",
    summary: "Training quality alongside team culture, standards and connection.",
    activities: [
      { time: "08:00", end: "08:45", title: "Breakfast", type: "Meal", location: "Hotel dining", involved: ["All Team"], details: "Slightly later start." },
      { time: "10:00", end: "11:45", title: "Pool session 3", type: "Swim", location: "Pool", involved: ["Swimmers", "Coaches", "Physio"], details: "Main pool set with race rehearsal elements." },
      { time: "12:30", end: "13:30", title: "Lunch", type: "Meal", location: "Hotel dining", involved: ["All Team"], details: "Recovery nutrition." },
      { time: "14:30", end: "15:30", title: "Team culture session", type: "Workshop", location: "Team room", involved: ["All Team", "Performance Lifestyle", "Psychology"], details: "Shared standards, behaviours and Games environment expectations." },
      { time: "16:00", end: "17:00", title: "Downtime / treatment window", type: "Recovery", location: "Hotel / Physio room", involved: ["Athletes", "Physio"], details: "Bookable treatment and recovery slots." },
      { time: "18:30", end: "19:30", title: "Dinner", type: "Meal", location: "Hotel dining", involved: ["All Team"], details: "Optional informal team catch-up afterwards." },
    ],
  },
  {
    id: "sun-19",
    tab: "Sun 19",
    date: "Sunday 19 July",
    shortDate: "19 Jul",
    theme: "Recovery + Refinement",
    summary: "Lower-load day with targeted prep, reminders and individual support.",
    activities: [
      { time: "08:00", end: "09:00", title: "Breakfast", type: "Meal", location: "Hotel dining", involved: ["All Team"], details: "Flexible breakfast window." },
      { time: "10:00", end: "11:00", title: "Recovery swim", type: "Swim", location: "Pool", involved: ["Swimmers", "Coaches", "Physio"], details: "Low intensity, individualised recovery work." },
      { time: "11:30", end: "12:15", title: "Clean sport / team standards reminder", type: "Briefing", location: "Team room", involved: ["Athletes", "Team Manager", "Support Staff"], details: "Key reminders, practical expectations and questions." },
      { time: "13:00", end: "14:00", title: "Lunch", type: "Meal", location: "Hotel dining", involved: ["All Team"], details: "Recovery nutrition." },
      { time: "15:00", end: "17:00", title: "Individual support window", type: "Recovery", location: "Hotel", involved: ["Athletes", "Physio", "Psychology", "Performance Lifestyle"], details: "Treatment, wellbeing, planning and optional check-ins." },
      { time: "18:30", end: "19:30", title: "Dinner", type: "Meal", location: "Hotel dining", involved: ["All Team"], details: "Preview of final full day." },
    ],
  },
  {
    id: "mon-20",
    tab: "Mon 20",
    date: "Monday 20 July",
    shortDate: "20 Jul",
    theme: "Final Quality Day",
    summary: "Sharpening, confidence building, staff alignment and final operational checks.",
    activities: [
      { time: "07:30", end: "08:15", title: "Breakfast", type: "Meal", location: "Hotel dining", involved: ["All Team"], details: "Standard training day breakfast." },
      { time: "09:00", end: "11:00", title: "Pool session 4", type: "Swim", location: "Pool", involved: ["Swimmers", "Coaches", "Physio"], details: "Final quality session and individual race plans." },
      { time: "11:30", end: "12:15", title: "Coach and staff alignment", type: "Meeting", location: "Staff room", involved: ["Coaches", "Team Manager", "Support Staff"], details: "Risks, athlete needs, travel plan and final communication points." },
      { time: "13:00", end: "14:00", title: "Lunch", type: "Meal", location: "Hotel dining", involved: ["All Team"], details: "Recovery and refuel." },
      { time: "15:30", end: "16:30", title: "Packing / kit check", type: "Logistics", location: "Team room", involved: ["Athletes", "Team Manager"], details: "Confirm kit, bags, accreditation and departure needs." },
      { time: "18:30", end: "20:00", title: "Final team dinner", type: "Meal", location: "Hotel dining", involved: ["All Team"], details: "Final messages and thank yous." },
    ],
  },
  {
    id: "tue-21",
    tab: "Tue 21",
    date: "Tuesday 21 July",
    shortDate: "21 Jul",
    theme: "Departure",
    summary: "Final breakfast, check-out, departures and staff debrief.",
    activities: [
      { time: "07:30", end: "09:00", title: "Breakfast", type: "Meal", location: "Hotel dining", involved: ["All Team"], details: "Flexible breakfast window around departures." },
      { time: "09:00", end: "10:00", title: "Room check-out", type: "Logistics", location: "Hotel", involved: ["Athletes", "Team Manager"], details: "Rooms, keys, packed lunches and luggage check." },
      { time: "10:00", end: "12:00", title: "Departures", type: "Travel", location: "Hotel entrance", involved: ["Athletes", "Coaches", "Support Staff"], details: "Departure groups confirmed in final travel plan." },
      { time: "13:00", end: "14:00", title: "Staff debrief", type: "Meeting", location: "Online / staff room", involved: ["Staff Team"], details: "Capture follow-up actions before the Games phase." },
    ],
  },
];

const typeConfig = {
  Swim: { icon: Waves, stripe: "bg-blue-500", badge: "bg-blue-100 text-blue-950 border-blue-200" },
  Media: { icon: Camera, stripe: "bg-fuchsia-500", badge: "bg-fuchsia-100 text-fuchsia-950 border-fuchsia-200" },
  "S&C": { icon: Dumbbell, stripe: "bg-emerald-500", badge: "bg-emerald-100 text-emerald-950 border-emerald-200" },
  Meal: { icon: Utensils, stripe: "bg-amber-400", badge: "bg-amber-100 text-amber-950 border-amber-200" },
  Briefing: { icon: ClipboardList, stripe: "bg-yellow-400", badge: "bg-yellow-100 text-yellow-950 border-yellow-200" },
  Meeting: { icon: Users, stripe: "bg-slate-500", badge: "bg-slate-100 text-slate-950 border-slate-200" },
  Workshop: { icon: Users, stripe: "bg-rose-500", badge: "bg-rose-100 text-rose-950 border-rose-200" },
  Logistics: { icon: CheckCircle2, stripe: "bg-cyan-400", badge: "bg-cyan-100 text-cyan-950 border-cyan-200" },
  Recovery: { icon: HeartPulse, stripe: "bg-lime-500", badge: "bg-lime-100 text-lime-950 border-lime-200" },
  Travel: { icon: Bus, stripe: "bg-indigo-500", badge: "bg-indigo-100 text-indigo-950 border-indigo-200" },
};

function TypeBadge({ type }) {
  const config = typeConfig[type] || typeConfig.Meeting;
  const Icon = config.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-bold uppercase tracking-wide ${config.badge}`}>
      <Icon size={13} /> {type}
    </span>
  );
}

function ScheduleRow({ activity, showDay = false }) {
  const config = typeConfig[activity.type] || typeConfig.Meeting;
  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-[#ffd100] hover:shadow-md">
      <div className="grid grid-cols-[6px_82px_1fr] sm:grid-cols-[7px_110px_1fr_260px]">
        <div className={`${config.stripe}`} />
        <div className="border-r border-slate-100 bg-slate-50 px-3 py-4 text-center">
          <p className="text-lg font-black tabular-nums text-[#071d49]">{activity.time}</p>
          <p className="text-xs font-semibold text-slate-500">to {activity.end}</p>
          {showDay && <p className="mt-2 rounded-full bg-[#071d49] px-2 py-1 text-[10px] font-bold text-white">{activity.dayTab}</p>}
        </div>
        <div className="px-4 py-4">
          <div className="flex flex-wrap items-center gap-2">
            <TypeBadge type={activity.type} />
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500"><MapPin size={13} /> {activity.location}</span>
          </div>
          <h3 className="mt-2 text-base font-black text-[#071d49] sm:text-lg">{activity.title}</h3>
          <p className="mt-1 text-sm leading-6 text-slate-600">{activity.details}</p>
        </div>
        <div className="border-t border-slate-100 bg-slate-50 px-4 py-4 sm:border-l sm:border-t-0">
          <p className="mb-2 flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-slate-500"><Users size={13} /> Involved</p>
          <div className="flex flex-wrap gap-1.5">
            {activity.involved.map((person) => (
              <span key={person} className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700">{person}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TeamScotlandPreparationCampTimeline() {
  const [activeTab, setActiveTab] = useState("overview");
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");

  const allActivities = useMemo(
    () => campDays.flatMap((day) => day.activities.map((activity) => ({ ...activity, dayId: day.id, dayTab: day.tab, dayDate: day.date, dayTheme: day.theme }))),
    []
  );

  const selectedDay = campDays.find((day) => day.id === activeTab);
  const activityTypes = useMemo(() => ["All", ...Array.from(new Set(allActivities.map((activity) => activity.type)))], [allActivities]);

  const filteredActivities = useMemo(() => {
    const base = selectedDay ? selectedDay.activities.map((activity) => ({ ...activity, dayId: selectedDay.id, dayTab: selectedDay.tab, dayDate: selectedDay.date, dayTheme: selectedDay.theme })) : allActivities;
    return base.filter((activity) => {
      const text = `${activity.title} ${activity.type} ${activity.location} ${activity.details} ${activity.involved.join(" ")} ${activity.dayDate}`.toLowerCase();
      return text.includes(search.toLowerCase()) && (typeFilter === "All" || activity.type === typeFilter);
    });
  }, [selectedDay, allActivities, search, typeFilter]);

  const totals = {
    days: campDays.length,
    activities: allActivities.length,
    swim: allActivities.filter((activity) => activity.type === "Swim").length,
    media: allActivities.filter((activity) => activity.type === "Media").length,
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-950">
      <header className="relative overflow-hidden bg-[#071d49] text-white">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 10%, #ffd100 0, transparent 24%), radial-gradient(circle at 90% 20%, #2c7be5 0, transparent 28%)" }} />
        <div className="relative mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-bold text-[#ffd100] backdrop-blur">
                <Trophy size={16} /> Team Scotland Preparation Camp
              </div>
              <h1 className="max-w-4xl text-3xl font-black tracking-tight sm:text-5xl">Camp Timeline</h1>
              <p className="mt-2 text-lg font-semibold text-[#ffd100]">Wednesday 15 July → Tuesday 21 July</p>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-blue-100">Schedule-first view for athletes, coaches and support staff. Use the tabs, search and filters to quickly find training, media, logistics and team activity blocks.</p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 xl:w-[560px]">
              {[['Days', totals.days], ['Activities', totals.activities], ['Swim blocks', totals.swim], ['Media blocks', totals.media]].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-white/15 bg-white/10 p-4 shadow-sm backdrop-blur">
                  <p className="text-3xl font-black text-white">{value}</p>
                  <p className="text-xs font-bold uppercase tracking-wide text-blue-100">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <nav className="mt-6 flex gap-2 overflow-x-auto pb-1">
            <Button onClick={() => setActiveTab("overview")} className={`shrink-0 rounded-xl border font-black ${activeTab === "overview" ? "border-[#ffd100] bg-[#ffd100] text-[#071d49] hover:bg-[#ffd100]" : "border-white/15 bg-white/10 text-white hover:bg-white/20"}`}>Overview</Button>
            {campDays.map((day) => (
              <Button key={day.id} onClick={() => setActiveTab(day.id)} className={`shrink-0 rounded-xl border font-black ${activeTab === day.id ? "border-[#ffd100] bg-[#ffd100] text-[#071d49] hover:bg-[#ffd100]" : "border-white/15 bg-white/10 text-white hover:bg-white/20"}`}>{day.tab}</Button>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <section className="mb-5 grid gap-3 rounded-3xl border border-slate-200 bg-white p-3 shadow-sm lg:grid-cols-[1fr_260px]">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search activity, people, venue or notes…" className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm font-medium outline-none focus:border-[#ffd100] focus:bg-white" />
          </div>
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
            <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)} className="h-12 w-full appearance-none rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm font-bold outline-none focus:border-[#ffd100] focus:bg-white">
              {activityTypes.map((type) => <option key={type}>{type}</option>)}
            </select>
          </div>
        </section>

        {activeTab === "overview" ? (
          <div className="grid gap-5 lg:grid-cols-[360px_1fr]">
            <aside className="space-y-3">
              <div className="rounded-3xl bg-[#071d49] p-5 text-white shadow-sm">
                <p className="flex items-center gap-2 text-sm font-black uppercase tracking-wide text-[#ffd100]"><Info size={16} /> Week at a glance</p>
                <p className="mt-2 text-sm leading-6 text-blue-100">Select a day to drill into the full schedule, or use the full overview to search across the week.</p>
              </div>
              {campDays.map((day) => (
                <button key={day.id} onClick={() => setActiveTab(day.id)} className="w-full rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:border-[#ffd100] hover:shadow-md">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-black uppercase tracking-wide text-slate-400">{day.date}</p>
                      <p className="mt-1 text-lg font-black text-[#071d49]">{day.theme}</p>
                      <p className="mt-1 text-sm leading-6 text-slate-600">{day.summary}</p>
                    </div>
                    <span className="rounded-full bg-[#ffd100] px-2.5 py-1 text-xs font-black text-[#071d49]">{day.activities.length}</span>
                  </div>
                </button>
              ))}
            </aside>

            <section className="space-y-3">
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <h2 className="text-2xl font-black text-[#071d49]">Full camp schedule</h2>
                <p className="mt-1 text-sm text-slate-600">Chronological activity list across the week.</p>
              </div>
              {filteredActivities.length ? filteredActivities.map((activity, index) => (
                <div key={`${activity.dayId}-${activity.time}-${activity.title}-${index}`}>
                  <p className="mb-2 ml-2 text-xs font-black uppercase tracking-wide text-slate-500">{activity.dayDate}</p>
                  <ScheduleRow activity={activity} showDay />
                </div>
              )) : <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center font-semibold text-slate-500">No activities match the current search/filter.</div>}
            </section>
          </div>
        ) : (
          <div className="space-y-4">
            <section className="rounded-3xl bg-[#071d49] p-5 text-white shadow-sm">
              <p className="text-sm font-black uppercase tracking-wide text-[#ffd100]">{selectedDay.date}</p>
              <div className="mt-2 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <h2 className="text-3xl font-black">{selectedDay.theme}</h2>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-blue-100">{selectedDay.summary}</p>
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-bold text-blue-100"><span className="text-2xl font-black text-white">{filteredActivities.length}</span> activities shown</div>
              </div>
            </section>
            <section className="space-y-3">
              {filteredActivities.length ? filteredActivities.map((activity, index) => <ScheduleRow key={`${activity.time}-${activity.title}-${index}`} activity={activity} />) : <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center font-semibold text-slate-500">No activities match the current search/filter.</div>}
            </section>
          </div>
        )}
      </main>
    </div>
  );
}
