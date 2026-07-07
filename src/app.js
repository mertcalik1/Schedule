window.addEventListener("error", (event) => {
  console.error(event.error || event.message);
  document.body.classList.add("app-error");
});

const storageKey = "zaman-takvimi-events-v1";
const routinesStorageKey = "zaman-takvimi-routines-v1";
const routineCompletionsStorageKey = "zaman-takvimi-routine-completions-v1";
const weekNotesStorageKey = "zaman-takvimi-week-notes-v1";
const remoteHolidayStorageKey = "zaman-takvimi-remote-holidays-v1";
const themeStorageKey = "zaman-takvimi-theme-v1";
const holidayCountryStorageKey = "zaman-takvimi-holiday-country-v1";
const languageStorageKey = "zaman-takvimi-language-v1";
const remoteHolidayFailuresStorageKey = "zaman-takvimi-remote-holiday-failures-v1";
const routineDragType = "application/x-zaman-routine";

const categories = {
  saglik: { label: "Health", color: "#d64f4f", bg: "#fdeeee" },
  is: { label: "Work", color: "#2f66d0", bg: "#edf3ff" },
  egitim: { label: "Education", color: "#5b6fd8", bg: "#eef0ff" },
  sosyal: { label: "Social", color: "#a35ab7", bg: "#f6ecfa" },
  spor: { label: "Sports", color: "#e09a23", bg: "#fff5df" },
  kisisel: { label: "Personal", color: "#1f7a5a", bg: "#eaf6f1" },
  aile: { label: "Family", color: "#c05a7e", bg: "#fdeff4" },
  arkadas: { label: "Friends", color: "#8a62c7", bg: "#f2edfb" },
  alisveris: { label: "Shopping", color: "#c67a26", bg: "#fff1e2" },
  ev: { label: "Housework", color: "#778023", bg: "#f4f6df" },
  seyahat: { label: "Travel", color: "#24829a", bg: "#e7f5f8" },
  finans: { label: "Finance", color: "#3d7c3c", bg: "#edf7eb" },
  hobi: { label: "Hobby", color: "#b85b35", bg: "#fff0e9" },
  dinlenme: { label: "Rest", color: "#54707f", bg: "#edf3f6" },
  bos: { label: "Free time", color: "#68737d", bg: "#eff2f3" },
};

const defaultRoutines = [
  { id: "morning-walk", title: "Morning walk", time: "07:30", durationMinutes: 45, category: "spor", reminderMinutes: 15, notes: "Daily movement routine" },
  { id: "breakfast", title: "Breakfast", time: "08:30", durationMinutes: 30, category: "kisisel", reminderMinutes: 0, notes: "Daily breakfast routine" },
  { id: "study", title: "Focus work", time: "10:00", durationMinutes: 90, category: "egitim", reminderMinutes: 15, notes: "Distraction-free work" },
  { id: "workout", title: "Workout", time: "18:30", durationMinutes: 60, category: "spor", reminderMinutes: 30, notes: "Training routine" },
  { id: "reading", title: "Reading", time: "21:30", durationMinutes: 30, category: "hobi", reminderMinutes: 15, notes: "End-of-day reading" },
];

const holidayCountries = {
  TR: {
    badge: "Özel gün",
    timeLabel: "Özel gün",
    fixed: [
      { month: 0, day: 1, title: "Yılbaşı", note: "Resmi tatil" },
      { month: 1, day: 14, title: "Sevgililer Günü", note: "Özel gün" },
      { month: 2, day: 8, title: "Dünya Kadınlar Günü", note: "Özel gün" },
      { month: 2, day: 18, title: "Çanakkale Zaferi ve Şehitleri Anma Günü", note: "Özel gün" },
      { month: 3, day: 23, title: "Ulusal Egemenlik ve Çocuk Bayramı", note: "Resmi tatil" },
      { month: 4, day: 1, title: "Emek ve Dayanışma Günü", note: "Resmi tatil" },
      { month: 4, day: 19, title: "Atatürk'ü Anma, Gençlik ve Spor Bayramı", note: "Resmi tatil" },
      { month: 6, day: 15, title: "Demokrasi ve Milli Birlik Günü", note: "Resmi tatil" },
      { month: 7, day: 30, title: "Zafer Bayramı", note: "Resmi tatil" },
      { month: 9, day: 28, title: "Cumhuriyet Bayramı Arifesi", note: "Yarım gün resmi tatil" },
      { month: 9, day: 29, title: "Cumhuriyet Bayramı", note: "Resmi tatil" },
      { month: 10, day: 10, title: "Atatürk'ü Anma Günü", note: "Özel gün" },
      { month: 10, day: 24, title: "Öğretmenler Günü", note: "Özel gün" },
    ],
    yearly: [
      { month: 4, weekday: 0, ordinal: 2, title: "Anneler Günü", note: "Özel gün" },
      { month: 5, weekday: 0, ordinal: 3, title: "Babalar Günü", note: "Özel gün" },
    ],
    movable: {
      2026: [
        { start: "2026-03-19", days: 1, title: "Ramazan Bayramı Arifesi", note: "Yarım gün resmi tatil" },
        { start: "2026-03-20", days: 3, title: "Ramazan Bayramı", note: "Dini bayram" },
        { start: "2026-05-26", days: 1, title: "Kurban Bayramı Arifesi", note: "Yarım gün resmi tatil" },
        { start: "2026-05-27", days: 4, title: "Kurban Bayramı", note: "Dini bayram" },
      ],
      2027: [
        { start: "2027-03-08", days: 1, title: "Ramazan Bayramı Arifesi", note: "Yarım gün resmi tatil" },
        { start: "2027-03-09", days: 3, title: "Ramazan Bayramı", note: "Dini bayram" },
        { start: "2027-05-16", days: 1, title: "Kurban Bayramı Arifesi", note: "Yarım gün resmi tatil" },
        { start: "2027-05-17", days: 4, title: "Kurban Bayramı", note: "Dini bayram" },
      ],
      2028: [
        { start: "2028-02-25", days: 1, title: "Ramazan Bayramı Arifesi", note: "Yarım gün resmi tatil" },
        { start: "2028-02-26", days: 3, title: "Ramazan Bayramı", note: "Dini bayram" },
        { start: "2028-05-04", days: 1, title: "Kurban Bayramı Arifesi", note: "Yarım gün resmi tatil" },
        { start: "2028-05-05", days: 4, title: "Kurban Bayramı", note: "Dini bayram" },
      ],
      2029: [
        { start: "2029-02-13", days: 1, title: "Ramazan Bayramı Arifesi", note: "Yarım gün resmi tatil" },
        { start: "2029-02-14", days: 3, title: "Ramazan Bayramı", note: "Dini bayram" },
        { start: "2029-04-23", days: 1, title: "Kurban Bayramı Arifesi", note: "Yarım gün resmi tatil" },
        { start: "2029-04-24", days: 4, title: "Kurban Bayramı", note: "Dini bayram" },
      ],
      2030: [
        { start: "2030-02-03", days: 1, title: "Ramazan Bayramı Arifesi", note: "Yarım gün resmi tatil" },
        { start: "2030-02-04", days: 3, title: "Ramazan Bayramı", note: "Dini bayram" },
        { start: "2030-04-12", days: 1, title: "Kurban Bayramı Arifesi", note: "Yarım gün resmi tatil" },
        { start: "2030-04-13", days: 4, title: "Kurban Bayramı", note: "Dini bayram" },
      ],
    },
  },
  US: {
    badge: "Holiday",
    timeLabel: "Holiday",
    fixed: [
      { month: 0, day: 1, title: "New Year's Day", note: "Federal holiday" },
      { month: 5, day: 19, title: "Juneteenth National Independence Day", note: "Federal holiday" },
      { month: 6, day: 4, title: "Independence Day", note: "Federal holiday" },
      { month: 10, day: 11, title: "Veterans Day", note: "Federal holiday" },
      { month: 11, day: 25, title: "Christmas Day", note: "Federal holiday" },
    ],
    yearly: [
      { month: 0, weekday: 1, ordinal: 3, title: "Martin Luther King Jr. Day", note: "Federal holiday" },
      { month: 1, weekday: 1, ordinal: 3, title: "Presidents' Day", note: "Federal holiday" },
      { month: 4, weekday: 1, ordinal: -1, title: "Memorial Day", note: "Federal holiday" },
      { month: 8, weekday: 1, ordinal: 1, title: "Labor Day", note: "Federal holiday" },
      { month: 9, weekday: 1, ordinal: 2, title: "Columbus Day", note: "Federal holiday" },
      { month: 10, weekday: 4, ordinal: 4, title: "Thanksgiving Day", note: "Federal holiday" },
    ],
    movable: {},
  },
};

const state = {
  view: "month",
  cursor: startOfDay(new Date()),
  routineChecklistDate: startOfDay(new Date()),
  todayDate: startOfDay(new Date()),
  todayKey: dateKey(new Date()),
  events: loadEvents(),
  routines: loadRoutines(),
  routineCompletions: loadRoutineCompletions(),
  weekNotes: loadWeekNotes(),
  holidayCountryOverride: loadHolidayCountryOverride(),
  holidayCountry: getActiveHolidayCountry(),
  remoteHolidays: loadRemoteHolidayCache(),
  remoteHolidayFailures: loadRemoteHolidayFailures(),
  pendingHolidayFetches: new Set(),
  theme: loadTheme(),
  language: loadLanguage(),
  selectedRoutineId: null,
  notifiedKeys: new Set(),
};

const els = {
  form: document.querySelector("#eventForm"),
  eventId: document.querySelector("#eventId"),
  title: document.querySelector("#title"),
  start: document.querySelector("#start"),
  end: document.querySelector("#end"),
  category: document.querySelector("#category"),
  reminder: document.querySelector("#reminder"),
  repeat: document.querySelector("#repeat"),
  notes: document.querySelector("#notes"),
  formTitle: document.querySelector("#formTitle"),
  sidebar: document.querySelector(".sidebar"),
  sidebarToggleButton: document.querySelector("#sidebarToggleButton"),
  resetFormButton: document.querySelector("#resetFormButton"),
  editRoutinesButton: document.querySelector("#editRoutinesButton"),
  routineModal: document.querySelector("#routineModal"),
  closeRoutineModalButton: document.querySelector("#closeRoutineModalButton"),
  routineForm: document.querySelector("#routineForm"),
  routineId: document.querySelector("#routineId"),
  routineTitle: document.querySelector("#routineTitle"),
  routineTime: document.querySelector("#routineTime"),
  routineDuration: document.querySelector("#routineDuration"),
  routineCategory: document.querySelector("#routineCategory"),
  resetRoutineButton: document.querySelector("#resetRoutineButton"),
  routineList: document.querySelector("#routineList"),
  routineManagerList: document.querySelector("#routineManagerList"),
  modal: document.querySelector("#eventModal"),
  modalDateLabel: document.querySelector("#modalDateLabel"),
  closeModalButton: document.querySelector("#closeModalButton"),
  dayEventsList: document.querySelector("#dayEventsList"),
  userSettingsButton: document.querySelector("#userSettingsButton"),
  userSettingsModal: document.querySelector("#userSettingsModal"),
  closeUserSettingsButton: document.querySelector("#closeUserSettingsButton"),
  languageSelect: document.querySelector("#languageSelect"),
  settingsHolidayCountrySelect: document.querySelector("#settingsHolidayCountrySelect"),
  notificationBellButton: document.querySelector("#notificationBellButton"),
  themeToggleButton: document.querySelector("#themeToggleButton"),
  notificationChat: document.querySelector("#notificationChat"),
  enableNotificationsButton: document.querySelector("#enableNotificationsButton"),
  notificationStatus: document.querySelector("#notificationStatus"),
  todayLabel: document.querySelector("#todayLabel"),
  currentRangeLabel: document.querySelector("#currentRangeLabel"),
  previousButton: document.querySelector("#previousButton"),
  todayButton: document.querySelector("#todayButton"),
  nextButton: document.querySelector("#nextButton"),
  tabs: document.querySelectorAll(".tab"),
  contentGrid: document.querySelector(".content-grid"),
  calendarView: document.querySelector("#calendarView"),
  routineChecklistPanel: document.querySelector("#routineChecklistPanel"),
  timeAnalysisPanel: document.querySelector("#timeAnalysisPanel"),
  analysisList: document.querySelector("#analysisList"),
  totalHours: document.querySelector("#totalHours"),
  eventTemplate: document.querySelector("#eventCardTemplate"),
};

registerServiceWorker();
applyTheme();
applyHolidayCountrySelection();
applyLanguageSelection();
setDefaultFormDates();
bindEvents();
renderRoutineList();
render();
updateNotificationStatus();
setInterval(checkReminders, 30000);
setInterval(updateLiveCalendar, 30000);

function bindEvents() {
  els.form.addEventListener("submit", saveEvent);
  els.routineForm.addEventListener("submit", saveRoutine);
  els.sidebarToggleButton.addEventListener("click", toggleSidebar);
  els.start.addEventListener("input", syncEndToStart);
  els.start.addEventListener("change", syncEndToStart);
  els.resetFormButton.addEventListener("click", resetForm);
  els.resetRoutineButton.addEventListener("click", resetRoutineForm);
  els.closeModalButton.addEventListener("click", closeModal);
  els.editRoutinesButton.addEventListener("click", () => openRoutineManager("manage"));
  els.closeRoutineModalButton.addEventListener("click", closeRoutineManager);
  els.modal.addEventListener("click", (event) => {
    if (event.target === els.modal) closeModal();
  });
  els.routineModal.addEventListener("click", (event) => {
    if (event.target === els.routineModal) closeRoutineManager();
  });
  els.userSettingsButton.addEventListener("click", openUserSettings);
  els.closeUserSettingsButton.addEventListener("click", closeUserSettings);
  els.userSettingsModal.addEventListener("click", (event) => {
    if (event.target === els.userSettingsModal) closeUserSettings();
  });
  els.routineList.addEventListener("dragstart", handleRoutineDragStart);
  els.routineList.addEventListener("click", handleRoutineSelect);
  els.routineManagerList.addEventListener("click", handleRoutineListClick);
  els.settingsHolidayCountrySelect.addEventListener("change", () => updateHolidayCountryOverride(els.settingsHolidayCountrySelect.value));
  els.languageSelect.addEventListener("change", updateLanguagePreference);
  els.notificationBellButton.addEventListener("click", toggleNotificationChat);
  els.themeToggleButton.addEventListener("click", toggleTheme);
  els.enableNotificationsButton.addEventListener("click", requestNotifications);
  els.previousButton.addEventListener("click", () => moveCursor(-1));
  els.nextButton.addEventListener("click", () => moveCursor(1));
  els.todayButton.addEventListener("click", () => {
    state.cursor = startOfDay(new Date());
    render();
  });

  els.tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      state.view = tab.dataset.view;
      render();
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !els.modal.classList.contains("hidden")) closeModal();
    if (event.key === "Escape" && !els.routineModal.classList.contains("hidden")) closeRoutineManager();
    if (event.key === "Escape" && !els.userSettingsModal.classList.contains("hidden")) closeUserSettings();
    if (event.key === "Escape" && !els.notificationChat.classList.contains("hidden")) closeNotificationChat();
  });

  document.addEventListener("click", (event) => {
    if (els.notificationChat.classList.contains("hidden")) return;
    if (els.notificationChat.contains(event.target) || els.notificationBellButton.contains(event.target)) return;
    closeNotificationChat();
  });
}

function toggleSidebar() {
  const isCollapsed = els.sidebar.classList.toggle("is-collapsed");
  els.sidebarToggleButton.title = isCollapsed ? "Open panel" : "Close panel";
  els.sidebarToggleButton.setAttribute("aria-label", isCollapsed ? "Open panel" : "Close panel");
}

function toggleTheme() {
  state.theme = state.theme === "dark" ? "light" : "dark";
  localStorage.setItem(themeStorageKey, state.theme);
  applyTheme();
}

function applyTheme() {
  document.documentElement.dataset.theme = state.theme;
  const isDark = state.theme === "dark";
  els.themeToggleButton.classList.toggle("is-dark", isDark);
  els.themeToggleButton.title = isDark ? "Light mode" : "Dark mode";
  els.themeToggleButton.setAttribute("aria-label", isDark ? "Light mode" : "Dark mode");
}

function updateHolidayCountryOverride(value) {
  state.holidayCountryOverride = value === "AUTO" ? "" : value;
  localStorage.setItem(holidayCountryStorageKey, state.holidayCountryOverride);
  state.holidayCountry = state.holidayCountryOverride || detectHolidayCountry();
  applyHolidayCountrySelection();
  render();
}

function applyHolidayCountrySelection() {
  const value = state.holidayCountryOverride || "AUTO";
  els.settingsHolidayCountrySelect.value = value;
}

function updateLanguagePreference() {
  state.language = els.languageSelect.value === "tr" ? "tr" : "en";
  localStorage.setItem(languageStorageKey, state.language);
  applyLanguageSelection();
}

function applyLanguageSelection() {
  els.languageSelect.value = state.language;
}

function openUserSettings() {
  applyHolidayCountrySelection();
  applyLanguageSelection();
  els.userSettingsModal.classList.remove("hidden");
  els.userSettingsModal.setAttribute("aria-hidden", "false");
  setTimeout(() => els.languageSelect.focus(), 0);
}

function closeUserSettings() {
  els.userSettingsModal.classList.add("hidden");
  els.userSettingsModal.setAttribute("aria-hidden", "true");
}

function syncEndToStart() {
  if (!els.start.value) return;
  const start = new Date(els.start.value);
  if (Number.isNaN(start.getTime())) return;
  els.end.value = toInputDateTime(new Date(start.getTime() + 60 * 60000));
}

function renderRoutineList() {
  els.routineList.innerHTML = "";
  els.routineManagerList.innerHTML = "";
  if (state.routines.length === 0) {
    els.routineList.appendChild(emptyState("No routines yet."));
    els.routineManagerList.appendChild(emptyState("No routines yet."));
    return;
  }

  state.routines.forEach((routine) => {
    const cat = categories[routine.category] || categories.kisisel;
    const item = createRoutineItem(routine, cat, false);
    const managerItem = createRoutineItem(routine, cat, true);
    els.routineList.appendChild(item);
    els.routineManagerList.appendChild(managerItem);
  });
}

function createRoutineItem(routine, cat, showActions) {
  const item = document.createElement("article");
  item.className = "routine-item";
  item.draggable = true;
  item.dataset.routineId = routine.id;
  item.classList.toggle("is-selected", !showActions && state.selectedRoutineId === routine.id);
  item.style.setProperty("--event-color", cat.color);
  item.style.setProperty("--event-bg", cat.bg);

  const grip = document.createElement("span");
  grip.className = "routine-grip";
  grip.setAttribute("aria-hidden", "true");
  grip.textContent = "::";

  const main = document.createElement("span");
  main.className = "routine-main";
  const title = document.createElement("strong");
  title.textContent = routine.title;
  const meta = document.createElement("span");
  meta.textContent = `${routine.time} - ${formatMinutes(routine.durationMinutes)} - ${cat.label}`;
  main.append(title, meta);

  item.append(grip, main);

  if (showActions) {
    const actions = document.createElement("span");
    actions.className = "routine-actions";
    actions.append(
      iconActionButton("edit-routine", "Edit routine", "pencil"),
      iconActionButton("danger delete-routine", "Delete routine", "trash"),
    );
    item.appendChild(actions);
  }

  return item;
}

function iconActionButton(className, label, icon) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `icon-button ${className}`;
  button.title = label;
  button.setAttribute("aria-label", label);
  button.appendChild(createSvgIcon(icon));
  return button;
}

function createSvgIcon(icon) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.classList.add(icon === "pencil" ? "pencil-icon" : "trash-icon");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("aria-hidden", "true");
  const paths = icon === "pencil"
    ? ["M12 20h9", "M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4 11.5-11.5Z"]
    : ["M3 6h18", "M8 6V4h8v2", "M6 6l1 15h10l1-15", "M10 11v6", "M14 11v6"];
  paths.forEach((value) => {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", value);
    svg.appendChild(path);
  });
  return svg;
}

function handleRoutineSelect(event) {
  const item = event.target.closest(".routine-item");
  if (!item || event.target.closest("button")) return;
  state.selectedRoutineId = state.selectedRoutineId === item.dataset.routineId ? null : item.dataset.routineId;
  renderRoutineList();
}

function handleRoutineDragStart(event) {
  const item = event.target.closest(".routine-item");
  if (!item) return;
  event.dataTransfer.effectAllowed = "copy";
  event.dataTransfer.setData(routineDragType, item.dataset.routineId);
  event.dataTransfer.setData("text/plain", item.dataset.routineId);
}

function handleRoutineListClick(event) {
  const item = event.target.closest(".routine-item");
  if (!item) return;
  if (event.target.closest(".edit-routine")) {
    editRoutine(item.dataset.routineId);
    return;
  }
  if (event.target.closest(".delete-routine")) {
    deleteRoutine(item.dataset.routineId);
  }
}

function saveRoutine(event) {
  event.preventDefault();
  const title = els.routineTitle.value.trim();
  const durationMinutes = Number(els.routineDuration.value);
  if (!title || !els.routineTime.value || !Number.isFinite(durationMinutes) || durationMinutes <= 0) return;

  const routine = {
    id: els.routineId.value || createId(),
    title,
    time: els.routineTime.value,
    durationMinutes,
    category: els.routineCategory.value,
    reminderMinutes: 15,
    notes: `${title} routine`,
  };

  state.routines = state.routines.filter((item) => item.id !== routine.id).concat(routine);
  persistRoutines();
  resetRoutineForm();
  renderRoutineList();
}

function editRoutine(id) {
  const routine = state.routines.find((item) => item.id === id);
  if (!routine) return;

  els.routineId.value = routine.id;
  els.routineTitle.value = routine.title;
  els.routineTime.value = routine.time;
  els.routineDuration.value = String(routine.durationMinutes);
  els.routineCategory.value = routine.category;
  els.routineForm.querySelector(".primary-button").textContent = "Update";
  openRoutineManager("edit");
  els.routineTitle.focus();
}

function deleteRoutine(id) {
  const routine = state.routines.find((item) => item.id === id);
  if (!routine) return;

  if (confirm(`Delete "${routine.title}" routine?`)) {
    state.routines = state.routines.filter((item) => item.id !== id);
    persistRoutines();
    resetRoutineForm();
    renderRoutineList();
  }
}

function resetRoutineForm() {
  els.routineForm.reset();
  els.routineId.value = "";
  els.routineTime.value = "09:00";
  els.routineDuration.value = "60";
  els.routineCategory.value = "kisisel";
  els.routineForm.querySelector(".primary-button").textContent = "Add routine";
}

function openRoutineManager(mode = "manage") {
  if (mode === "add") resetRoutineForm();
  renderRoutineList();
  els.routineModal.classList.remove("hidden");
  els.routineModal.setAttribute("aria-hidden", "false");
  if (mode === "add") setTimeout(() => els.routineTitle.focus(), 0);
}

function closeRoutineManager() {
  els.routineModal.classList.add("hidden");
  els.routineModal.setAttribute("aria-hidden", "true");
  resetRoutineForm();
}

function saveEvent(event) {
  event.preventDefault();

  const start = new Date(els.start.value);
  const end = new Date(els.end.value);

  if (end <= start) {
    alert("End time must be after the start time.");
    return;
  }

  const payload = {
    id: els.eventId.value || createId(),
    title: els.title.value.trim(),
    start: start.toISOString(),
    end: end.toISOString(),
    category: els.category.value,
    reminderMinutes: Number(els.reminder.value),
    repeat: els.repeat.value,
    notes: els.notes.value.trim(),
    createdAt: new Date().toISOString(),
  };

  state.events = state.events.filter((item) => item.id !== payload.id).concat(payload);
  persistEvents();
  state.cursor = startOfDay(start);
  closeModal();
  render();
}

function resetForm() {
  els.form.reset();
  els.eventId.value = "";
  setDefaultFormDates(state.cursor);
  els.formTitle.textContent = "New event";
  els.form.querySelector(".primary-button").textContent = "Save";
}

function editEvent(id) {
  const item = state.events.find((event) => event.id === id);
  if (!item) return;

  els.eventId.value = item.id;
  els.title.value = item.title;
  els.start.value = toInputDateTime(new Date(item.start));
  els.end.value = toInputDateTime(new Date(item.end));
  els.category.value = item.category;
  els.reminder.value = String(item.reminderMinutes);
  els.repeat.value = item.repeat;
  els.notes.value = item.notes || "";
  state.cursor = startOfDay(new Date(item.start));
  openModal();
  renderDayEventsInModal(state.cursor);
  els.formTitle.textContent = "Edit event";
  els.form.querySelector(".primary-button").textContent = "Update";
  els.title.focus();
}

function deleteEvent(id) {
  const item = state.events.find((event) => event.id === id);
  if (!item) return;

  if (confirm(`Delete "${item.title}" event?`)) {
    state.events = state.events.filter((event) => event.id !== id);
    persistEvents();
    renderDayEventsInModal(state.cursor);
    render();
  }
}

function render() {
  els.tabs.forEach((tab) => tab.classList.toggle("active", tab.dataset.view === state.view));
  els.contentGrid.classList.toggle("year-view", state.view === "year");
  updateHeaderClock();
  els.currentRangeLabel.textContent = rangeLabel();

  const range = getRangeForView();
  ensureRemoteHolidaysForRange(range.start, range.end);
  const occurrences = getOccurrences(range.start, range.end);
  const calendarItems = addSpecialDays(occurrences, range.start, range.end);

  if (state.view === "day") renderDay(calendarItems);
  if (state.view === "week") renderWeek(calendarItems);
  if (state.view === "month") renderMonth(calendarItems);
  if (state.view === "year") renderYear(occurrences);
  renderRoutineChecklist();

  renderAnalysis(occurrences);
  updateCurrentTimeMarker();
}

function updateLiveCalendar() {
  const now = new Date();
  const today = startOfDay(now);
  const nextTodayKey = dateKey(today);
  if (nextTodayKey !== state.todayKey) {
    const wasViewingToday = isSameDay(state.cursor, state.todayDate);
    const wasTrackingToday = isSameDay(state.routineChecklistDate, state.todayDate);
    state.todayDate = today;
    state.todayKey = nextTodayKey;
    if (wasViewingToday) state.cursor = today;
    if (wasTrackingToday) state.routineChecklistDate = today;
    render();
    return;
  }
  updateHeaderClock();
  updateCurrentTimeMarker();
}
function updateHeaderClock() {
  els.todayLabel.textContent = formatHeaderDateTime(new Date());
}

function renderMonth(occurrences) {
  const first = startOfMonth(state.cursor);
  const gridStart = addDays(first, -((first.getDay() + 6) % 7));
  const days = Array.from({ length: 42 }, (_, index) => addDays(gridStart, index));

  els.calendarView.innerHTML = `
    <div class="calendar-header">${weekDayNames().map((name) => `<span>${name}</span>`).join("")}</div>
    <div class="month-grid"></div>
  `;

  const grid = els.calendarView.querySelector(".month-grid");
  days.forEach((day) => {
    const cell = document.createElement("div");
    cell.className = "month-cell";
    if (day.getMonth() !== state.cursor.getMonth()) cell.classList.add("muted");
    if (isSameDay(day, new Date())) cell.classList.add("today");
    if (isSameDay(day, state.routineChecklistDate)) cell.classList.add("selected-routine-day");
    cell.innerHTML = `<div class="day-number"><span>${day.getDate()}</span></div>`;
    cell.addEventListener("click", () => {
      if (placeSelectedRoutine(day)) return;
      state.routineChecklistDate = startOfDay(day);
      openDayEditor(day);
      render();
    });
    enableRoutineDrop(cell, day);

    getEventsForDay(occurrences, day).slice(0, 4).forEach((item) => {
      cell.appendChild(createMiniEvent(item));
    });

    grid.appendChild(cell);
  });
}

function renderWeek(occurrences) {
  const start = startOfWeek(state.cursor);
  const days = Array.from({ length: 7 }, (_, index) => addDays(start, index));
  els.calendarView.innerHTML = `<div class="week-layout"><div class="week-grid"></div></div>`;
  const grid = els.calendarView.querySelector(".week-grid");
  const weekKey = dateKey(start);

  days.forEach((day, index) => {
    const stack = document.createElement("div");
    stack.className = "week-day-stack";

    const column = document.createElement("section");
    column.className = "week-day";
    if (isSameDay(day, new Date())) column.classList.add("today");
    if (isSameDay(day, state.routineChecklistDate)) column.classList.add("selected-routine-day");
    column.innerHTML = `<div class="day-number"><span>${weekDayNames()[((day.getDay() + 6) % 7)]}</span><span>${day.getDate()}</span></div>`;
    column.addEventListener("click", () => {
      if (placeSelectedRoutine(day)) return;
      state.routineChecklistDate = startOfDay(day);
      openDayEditor(day);
      render();
    });
    enableRoutineDrop(column, day);
    const dayEvents = getEventsForDay(occurrences, day);
    if (dayEvents.length === 0) {
      column.appendChild(emptyState("No plans"));
    } else {
      dayEvents.forEach((item) => column.appendChild(createMiniEvent(item)));
    }
    stack.append(column, createWeekDayNote(day, weekKey, index));
    grid.appendChild(stack);
  });
}

function createWeekDayNote(day, weekKey, dayIndex) {
  const key = `${weekKey}:${dayIndex}`;
  const wrapper = document.createElement("label");
  wrapper.className = "week-day-note";
  wrapper.addEventListener("click", (event) => event.stopPropagation());
  wrapper.addEventListener("pointerdown", (event) => event.stopPropagation());

  const title = document.createElement("span");
  title.textContent = "Note";

  const textarea = document.createElement("textarea");
  textarea.value = state.weekNotes[key] || "";
  textarea.placeholder = "Add a note";
  textarea.setAttribute("aria-label", `Note for ${formatLongDate(day)}`);
  textarea.addEventListener("input", () => updateWeekNote(key, textarea.value));

  wrapper.append(title, textarea);
  return wrapper;
}

function updateWeekNote(key, value) {
  const note = value.trim();
  if (note) {
    state.weekNotes[key] = value;
  } else {
    delete state.weekNotes[key];
  }
  persistWeekNotes();
}

function renderDay(occurrences) {
  const dayStart = startOfDay(state.cursor);
  const dayEnd = endOfDay(state.cursor);
  const dayEvents = getEventsForDay(occurrences, state.cursor).map((item) => withVisibleRange(item, dayStart, dayEnd));
  els.calendarView.innerHTML = `<div class="day-grid"></div>`;
  const grid = els.calendarView.querySelector(".day-grid");

  Array.from({ length: 24 }, (_, hour) => hour).forEach((hour) => {
    const slot = document.createElement("div");
    slot.className = "day-slot";
    slot.innerHTML = `
      <div class="day-slot-time">${formatSlotTime(hour, 0)}</div>
      <div class="day-slot-body"><span class="half-hour-line" aria-hidden="true"></span></div>
    `;
    const slotBody = slot.querySelector(".day-slot-body");
    slot.addEventListener("click", (event) => {
      const selected = new Date(state.cursor);
      const minute = minuteFromSlotPointer(event, slotBody);
      selected.setHours(hour, minute, 0, 0);
      if (placeSelectedRoutine(selected, { useDropHour: true })) return;
      openDayEditor(selected);
    });
    const dropDate = new Date(state.cursor);
    dropDate.setHours(hour, 0, 0, 0);
    enableRoutineDrop(slot, dropDate, { useDropHour: true, usePointerMinute: true, slotBody });
    dayEvents
      .filter((item) => item.visibleStart.getHours() === hour)
      .forEach((item) => slotBody.appendChild(createPositionedDayEvent(item)));
    grid.appendChild(slot);
  });

}

function updateCurrentTimeMarker() {
  els.calendarView.querySelectorAll(".current-time-marker").forEach((marker) => marker.remove());
  if (state.view !== "day" || !isSameDay(state.cursor, new Date())) return;
  const now = new Date();
  const slot = els.calendarView.querySelectorAll(".day-slot")[now.getHours()];
  const slotBody = slot?.querySelector(".day-slot-body");
  if (!slotBody) return;
  const marker = document.createElement("div");
  marker.className = "current-time-marker";
  marker.style.top = `${Math.min(98, Math.max(0, (now.getMinutes() / 60) * 100))}%`;
  marker.innerHTML = `<span class="current-time-dot" aria-hidden="true"></span><span class="current-time-line" aria-hidden="true"></span><span class="current-time-label">${formatTime(now)}</span>`;
  slotBody.appendChild(marker);
}

function createPositionedDayEvent(item) {
  const start = item.visibleStart || new Date(item.start);
  const end = item.visibleEnd || new Date(item.end);
  const durationMinutes = Math.max(15, Math.round((end - start) / 60000));
  const wrapper = document.createElement("div");
  wrapper.className = "day-event-position";
  wrapper.style.top = `${Math.min(100, Math.max(0, (start.getMinutes() / 60) * 100))}%`;
  wrapper.style.setProperty("--duration-minutes", durationMinutes);
  wrapper.appendChild(createMiniEvent(item));
  return wrapper;
}

function renderRoutineChecklist() {
  els.routineChecklistPanel.innerHTML = "";
  const shouldShow = ["week", "month", "year"].includes(state.view);
  const shouldUseSideRail = ["week", "month"].includes(state.view);
  els.contentGrid.classList.toggle("has-routine-checklist", shouldUseSideRail);
  els.routineChecklistPanel.classList.toggle("hidden", !shouldShow);
  if (!shouldShow) return;

  const selectedDate = startOfDay(state.routineChecklistDate);
  const scheduledRoutines = getScheduledRoutinesForDay(selectedDate);
  const doneCount = scheduledRoutines.filter((item) => isRoutineDone(item.completionId, selectedDate)).length;
  els.routineChecklistPanel.innerHTML = `
    <div class="routine-checklist-header">
      <div>
        <p class="eyebrow">Routine tracking</p>
        <h3>${formatLongDate(selectedDate)}</h3>
      </div>
      <span class="metric-pill">${doneCount}/${scheduledRoutines.length}</span>
    </div>
    <div class="routine-checklist-list"></div>
  `;

  const list = els.routineChecklistPanel.querySelector(".routine-checklist-list");
  if (scheduledRoutines.length === 0) {
    list.appendChild(emptyState("No routines scheduled for this day."));
  } else {
    scheduledRoutines.forEach((routine) => list.appendChild(createRoutineCheckItem(routine, selectedDate)));
  }
}

function createRoutineCheckItem(routine, date) {
  const cat = categories[routine.category] || categories.kisisel;
  const item = document.createElement("label");
  const checked = isAnyRoutineCompletionDone([routine.completionId, routine.legacyCompletionId], date);
  item.className = `routine-check-item${checked ? " is-done" : ""}`;
  item.style.setProperty("--event-color", cat.color);
  item.style.setProperty("--event-bg", cat.bg);

  const input = document.createElement("input");
  input.type = "checkbox";
  input.checked = checked;
  const box = document.createElement("span");
  box.className = "routine-check-box";
  box.setAttribute("aria-hidden", "true");
  const main = document.createElement("span");
  main.className = "routine-check-main";
  const title = document.createElement("strong");
  title.textContent = routine.title;
  const meta = document.createElement("span");
  meta.textContent = `${routine.time} - ${formatMinutes(routine.durationMinutes)} - ${cat.label}`;
  main.append(title, meta);
  item.append(input, box, main);

  input.addEventListener("change", (event) => {
    setRoutineDoneIds([routine.completionId, routine.legacyCompletionId], date, event.target.checked);
    render();
  });
  return item;
}

function enableRoutineDrop(target, date, options = {}) {
  target.addEventListener("dragover", (event) => {
    if (!Array.from(event.dataTransfer.types).includes(routineDragType)) return;
    event.preventDefault();
    target.classList.add("routine-drop-target");
    event.dataTransfer.dropEffect = "copy";
  });
  target.addEventListener("dragleave", () => {
    target.classList.remove("routine-drop-target");
  });
  target.addEventListener("drop", (event) => {
    const routineId = event.dataTransfer.getData(routineDragType) || event.dataTransfer.getData("text/plain");
    const routine = state.routines.find((item) => item.id === routineId);
    if (!routine) return;
    event.preventDefault();
    event.stopPropagation();
    target.classList.remove("routine-drop-target");
    if (options.usePointerMinute) {
      date.setMinutes(minuteFromSlotPointer(event, options.slotBody || target), 0, 0);
    }
    addRoutineToDate(routine, date, options);
  });
}

function placeSelectedRoutine(date, options = {}) {
  if (!state.selectedRoutineId) return false;
  const routine = state.routines.find((item) => item.id === state.selectedRoutineId);
  if (!routine) {
    state.selectedRoutineId = null;
    renderRoutineList();
    return false;
  }
  addRoutineToDate(routine, date, options);
  return true;
}

function addRoutineToDate(routine, date, options = {}) {
  const start = new Date(date);
  if (options.useDropHour) {
    start.setSeconds(0, 0);
  } else {
    const [hour, minute] = routine.time.split(":").map(Number);
    start.setHours(hour, minute, 0, 0);
  }

  const event = {
    ...makeEvent(routine.title, start, routine.durationMinutes, routine.category, routine.notes, routine.reminderMinutes, "none"),
    routineId: routine.id,
    source: "routine",
  };
  state.events = state.events.concat(event);
  state.selectedRoutineId = null;
  persistEvents();
  state.cursor = startOfDay(start);
  render();
}

function renderYear(occurrences) {
  const year = state.cursor.getFullYear();
  els.calendarView.innerHTML = `<div class="year-grid"></div>`;
  const grid = els.calendarView.querySelector(".year-grid");

  Array.from({ length: 12 }, (_, month) => {
    const monthStart = new Date(year, month, 1);
    const monthEnd = endOfMonth(monthStart);
    const monthEvents = occurrences.filter((item) => rangesOverlap(new Date(item.start), new Date(item.end), monthStart, monthEnd));
    const hours = totalHours(monthEvents);
    const busyPercent = Math.min(100, Math.round((hours / (24 * daysInMonth(monthStart))) * 100));
    const el = document.createElement("article");
    el.className = "year-month";
    el.addEventListener("click", () => {
      state.view = "month";
      state.cursor = monthStart;
      render();
    });
    el.innerHTML = `
      <h3>${monthStart.toLocaleDateString("en-US", { month: "long" })}</h3>
      <div class="year-meter"><span style="width:${busyPercent}%; --bar-color:${categories.kisisel.color}"></span></div>
      <p class="event-meta">${monthEvents.length} events, ${formatHours(hours)}</p>
    `;
    grid.appendChild(el);
  });
}

function renderAnalysis(occurrences) {
  const shouldShow = ["week", "month", "year"].includes(state.view);
  els.timeAnalysisPanel.classList.toggle("hidden", !shouldShow);
  if (!shouldShow) return;

  const analysisEvents = getAnalysisEvents(occurrences);
  const totals = Object.keys(categories).map((key) => ({
    key,
    label: categories[key].label,
    color: categories[key].color,
    hours: totalHours(analysisEvents.filter((event) => event.category === key)),
  })).filter((item) => item.hours > 0);

  const allHours = totals.reduce((sum, item) => sum + item.hours, 0);
  els.totalHours.textContent = formatHours(allHours);
  els.analysisList.innerHTML = "";

  if (totals.length === 0) {
    els.analysisList.appendChild(emptyState("No time data in this range."));
    return;
  }

  totals.sort((a, b) => b.hours - a.hours).forEach((item) => {
    const percent = allHours === 0 ? 0 : Math.round((item.hours / allHours) * 100);
    const row = document.createElement("div");
    row.className = "analysis-row";
    row.innerHTML = `
      <div class="analysis-label"><span>${item.label}</span><span>%${percent} - ${formatHours(item.hours)}</span></div>
      <div class="analysis-bar"><span style="width:${percent}%; --bar-color:${item.color}"></span></div>
    `;
    els.analysisList.appendChild(row);
  });
}


function getAnalysisEvents(events) {
  return events.filter((event) => {
    if (!getRoutineForEvent(event)) return true;
    return isAnyRoutineCompletionDone(getRoutineCompletionIds(event), startOfDay(new Date(event.start)));
  });
}
function createMiniEvent(item) {
  const cat = categories[item.category] || categories.kisisel;
  const button = document.createElement("button");
  button.className = `mini-event${item.isSpecialDay ? " special-day-event" : ""}`;
  button.type = "button";
  if (item.isSpecialDay) button.dataset.label = item.badgeLabel || getHolidayProfile().badge;
  button.style.setProperty("--event-color", cat.color);
  button.style.setProperty("--event-bg", cat.bg);
  const displayStart = item.visibleStart || new Date(item.start);
  button.textContent = item.isSpecialDay ? item.title : `${formatTime(displayStart)} ${item.title}`;
  button.title = item.isSpecialDay ? `${item.title} - ${item.notes}` : item.title;
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    if (item.isSpecialDay) return;
    editEvent(item.originalId);
  });
  return button;
}

function createEventCard(item) {
  const node = els.eventTemplate.content.firstElementChild.cloneNode(true);
  const cat = categories[item.category] || categories.kisisel;
  node.classList.toggle("special-day-card", Boolean(item.isSpecialDay));
  node.style.setProperty("--event-color", cat.color);
  node.querySelector("h3").textContent = item.title;
  node.querySelector(".event-time").textContent = item.isSpecialDay ? item.timeLabel : formatTimeRange(new Date(item.start), new Date(item.end));
  node.querySelector(".event-meta").textContent = `${formatLongDate(new Date(item.start))} - ${cat.label} - ${reminderLabel(item.reminderMinutes)}`;
  node.querySelector(".event-notes").textContent = item.notes || repeatLabel(item.repeat);
  const actions = node.querySelector(".event-actions");
  if (item.isSpecialDay) {
    actions.remove();
  } else {
    const editButton = iconActionButton("edit-event", "Edit event", "pencil");
    const deleteButton = iconActionButton("danger delete-event", "Delete event", "trash");
    editButton.addEventListener("click", () => editEvent(item.originalId));
    deleteButton.addEventListener("click", () => deleteEvent(item.originalId));
    actions.append(editButton, deleteButton);
  }
  return node;
}

function emptyState(text) {
  const el = document.createElement("div");
  el.className = "empty-state";
  el.textContent = text;
  return el;
}

function openDayEditor(day) {
  state.cursor = startOfDay(day);
  resetForm();
  setDefaultFormDates(day);
  renderDayEventsInModal(state.cursor);
  openModal();
}

function openModal() {
  els.modal.classList.remove("hidden");
  els.modal.setAttribute("aria-hidden", "false");
  els.modalDateLabel.textContent = formatLongDate(state.cursor);
  setTimeout(() => els.title.focus(), 0);
}

function closeModal() {
  els.modal.classList.add("hidden");
  els.modal.setAttribute("aria-hidden", "true");
  resetForm();
}

function renderDayEventsInModal(day) {
  const dayStart = startOfDay(day);
  const dayEnd = endOfDay(day);
  const events = getEventsForDay(addSpecialDays(getOccurrences(dayStart, dayEnd), dayStart, dayEnd), day);
  els.dayEventsList.innerHTML = "";

  if (events.length === 0) {
    els.dayEventsList.appendChild(emptyState("No events have been added to this day yet."));
    return;
  }

  events.forEach((item) => els.dayEventsList.appendChild(createEventCard(item)));
}

function getOccurrences(rangeStart, rangeEnd) {
  const output = [];

  state.events.forEach((event) => {
    const baseStart = new Date(event.start);
    const baseEnd = new Date(event.end);
    const duration = baseEnd - baseStart;

    if (event.repeat === "none") {
      if (rangesOverlap(baseStart, baseEnd, rangeStart, rangeEnd)) {
        output.push({ ...event, originalId: event.id });
      }
      return;
    }

    let cursor = new Date(baseStart);
    let guard = 0;
    while (cursor <= rangeEnd && guard < 500) {
      const occurrenceEnd = new Date(cursor.getTime() + duration);
      if (rangesOverlap(cursor, occurrenceEnd, rangeStart, rangeEnd)) {
        output.push({ ...event, originalId: event.id, start: cursor.toISOString(), end: occurrenceEnd.toISOString() });
      }
      cursor = nextRepeatDate(cursor, event.repeat);
      guard += 1;
    }
  });

  return output.sort((a, b) => new Date(a.start) - new Date(b.start));
}

function addSpecialDays(events, rangeStart, rangeEnd) {
  return events.concat(getSpecialDays(rangeStart, rangeEnd)).sort((a, b) => {
    const timeDiff = new Date(a.start) - new Date(b.start);
    if (timeDiff !== 0) return timeDiff;
    return Number(Boolean(b.isSpecialDay)) - Number(Boolean(a.isSpecialDay));
  });
}

function getSpecialDays(rangeStart, rangeEnd) {
  const profile = getHolidayProfile();
  const years = [];
  for (let year = rangeStart.getFullYear(); year <= rangeEnd.getFullYear(); year += 1) {
    years.push(year);
  }

  return years.flatMap((year) => {
    const fixed = profile.fixed.map((day) => createSpecialDay(year, day.month, day.day, day.title, day.note, profile));
    const yearly = profile.yearly.map((day) => {
      const date = nthWeekdayOfMonth(year, day.month, day.weekday, day.ordinal);
      return createSpecialDay(date.getFullYear(), date.getMonth(), date.getDate(), day.title, day.note, profile);
    });
    const movable = (profile.movable[year] || []).flatMap((holiday) => {
      const start = parseDateKey(holiday.start);
      return Array.from({ length: holiday.days }, (_, index) => {
        const date = addDays(start, index);
        const title = holiday.days > 1 ? formatHolidayDayTitle(holiday.title, index + 1, profile.countryCode) : holiday.title;
        return createSpecialDay(date.getFullYear(), date.getMonth(), date.getDate(), title, holiday.note, profile);
      });
    });
    return fixed.concat(yearly, movable, getRemoteSpecialDaysForYear(year, profile));
  }).filter((day) => rangesOverlap(new Date(day.start), new Date(day.end), rangeStart, rangeEnd));
}

function createSpecialDay(year, month, day, title, note, profile = getHolidayProfile()) {
  const start = new Date(year, month, day, 9, 0, 0, 0);
  const sentence = profile.countryCode === "TR" ? `${note}. Bugün ${title}.` : `${note}. Today is ${title}.`;
  return {
    id: `special-${dateKey(start)}-${slugify(title)}`,
    originalId: `special-${dateKey(start)}-${slugify(title)}`,
    title,
    start: start.toISOString(),
    end: new Date(start.getTime() + 60 * 60000).toISOString(),
    category: "sosyal",
    notes: sentence,
    reminderMinutes: 0,
    repeat: "none",
    badgeLabel: profile.badge,
    timeLabel: profile.timeLabel,
    isSpecialDay: true,
  };
}

function getRemoteSpecialDaysForYear(year, profile) {
  if (holidayCountries[profile.countryCode]) return [];
  return (state.remoteHolidays[`${profile.countryCode}-${year}`] || []).map((holiday) => {
    const date = parseDateKey(holiday.date);
    return createSpecialDay(date.getFullYear(), date.getMonth(), date.getDate(), holiday.title, holiday.note, profile);
  });
}

function getHolidayProfile() {
  return holidayCountries[state.holidayCountry] || {
    countryCode: state.holidayCountry,
    badge: "Holiday",
    timeLabel: "Holiday",
    fixed: [],
    yearly: [],
    movable: {},
  };
}

function getActiveHolidayCountry() {
  return loadHolidayCountryOverride() || detectHolidayCountry();
}

function detectHolidayCountry() {
  const region = getLocaleRegion();
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
  if (timeZone === "Europe/Istanbul") return "TR";
  if (timeZone.startsWith("America/") && (!region || region === "TR" || region === "US")) return "US";
  if (region && holidayCountries[region]) return region;
  if (region) return region;
  return "TR";
}

function getLocaleRegion() {
  const language = navigator.languages?.[0] || navigator.language || "";
  try {
    return new Intl.Locale(language).region?.toUpperCase() || "";
  } catch {
    const match = language.match(/[-_]([A-Za-z]{2})\b/);
    return match ? match[1].toUpperCase() : "";
  }
}

function ensureRemoteHolidaysForRange(rangeStart, rangeEnd) {
  const profile = getHolidayProfile();
  if (holidayCountries[profile.countryCode] || !window.fetch) return;
  for (let year = rangeStart.getFullYear(); year <= rangeEnd.getFullYear(); year += 1) {
    ensureRemoteHolidaysForYear(profile.countryCode, year);
  }
}

function ensureRemoteHolidaysForYear(countryCode, year) {
  const key = `${countryCode}-${year}`;
  if (state.remoteHolidays[key] || state.pendingHolidayFetches.has(key)) return;
  const failedAt = state.remoteHolidayFailures[key] || 0;
  if (Date.now() - failedAt < 10 * 60 * 1000) return;
  state.pendingHolidayFetches.add(key);
  fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`)
    .then((response) => (response.ok ? response.json() : []))
    .then((holidays) => {
      if (!Array.isArray(holidays)) return;
      state.remoteHolidays[key] = holidays.map((holiday) => ({
        date: holiday.date,
        title: holiday.name || holiday.localName,
        note: "Public holiday",
      })).filter((holiday) => holiday.date && holiday.title);
      delete state.remoteHolidayFailures[key];
      persistRemoteHolidays();
      persistRemoteHolidayFailures();
      render();
    })
    .catch(() => {
      state.remoteHolidayFailures[key] = Date.now();
      persistRemoteHolidayFailures();
      // Country-specific holidays stay unavailable until the device is online.
    })
    .finally(() => {
      state.pendingHolidayFetches.delete(key);
    });
}

function formatHolidayDayTitle(title, dayNumber, countryCode) {
  return countryCode === "TR" ? `${title} (${dayNumber}. gün)` : `${title} (Day ${dayNumber})`;
}

function checkReminders() {
  const now = new Date();
  const soon = addDays(now, 2);
  getOccurrences(now, soon).forEach((event) => {
    const reminderTime = new Date(new Date(event.start).getTime() - event.reminderMinutes * 60000);
    const diff = Math.abs(now - reminderTime);
    const key = `${event.originalId}-${event.start}`;
    if (diff <= 30000 && !state.notifiedKeys.has(key)) {
      state.notifiedKeys.add(key);
      showSystemNotification(event.title, `${formatTimeRange(new Date(event.start), new Date(event.end))} - ${categories[event.category]?.label || "Event"}`);
    }
  });

  checkSpecialDayNotifications(now);
  checkRoutineAlarms(now);
}

function checkSpecialDayNotifications(now) {
  const today = startOfDay(now);
  const notificationTime = new Date(today);
  notificationTime.setHours(9, 0, 0, 0);
  if (now < notificationTime) return;
  getSpecialDays(today, endOfDay(today)).forEach((day) => {
    const key = `special-${day.originalId}-${dateKey(today)}`;
    if (state.notifiedKeys.has(key)) return;
    state.notifiedKeys.add(key);
    showSystemNotification(day.title, day.notes);
  });
}

function checkRoutineAlarms(now) {
  const today = startOfDay(now);
  getScheduledRoutinesForDay(today).forEach((routine) => {
    if (isAnyRoutineCompletionDone([routine.completionId, routine.legacyCompletionId], today)) return;
    const [hour, minute] = routine.time.split(":").map(Number);
    const due = new Date(today);
    due.setHours(hour, minute, 0, 0);
    const diff = Math.abs(now - due);
    const key = `routine-${routine.completionId}-${dateKey(today)}`;
    if (diff <= 30000 && !state.notifiedKeys.has(key)) {
      state.notifiedKeys.add(key);
      playRoutineAlarm();
      showSystemNotification(`Routine time: ${routine.title}`, `${routine.time} - check it off when complete.`);
      state.routineChecklistDate = today;
      render();
    }
  });
}

function showSystemNotification(title, body) {
  if (!("Notification" in window) || Notification.permission !== "granted") return;
  new Notification(title, { body });
}

function playRoutineAlarm() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const context = new AudioContext();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = "sine";
    oscillator.frequency.value = 880;
    gain.gain.setValueAtTime(0.001, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.18, context.currentTime + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.75);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.8);
  } catch {
    // Some systems block audio until the user interacts with the app.
  }
}

function requestNotifications() {
  if (!("Notification" in window)) {
    updateNotificationStatus("This browser does not support notifications.");
    return;
  }

  Notification.requestPermission().then(() => {
    updateNotificationStatus();
    checkReminders();
    openNotificationChat();
  });
}

function updateNotificationStatus(customText) {
  els.notificationBellButton.classList.remove("is-on", "is-off", "is-blocked");

  if (customText) {
    els.notificationStatus.textContent = customText;
    els.enableNotificationsButton.hidden = true;
    els.enableNotificationsButton.disabled = true;
    els.notificationBellButton.classList.add("is-blocked");
    els.notificationBellButton.title = customText;
    els.notificationBellButton.setAttribute("aria-label", customText);
    return;
  }

  if (!("Notification" in window)) {
    els.notificationStatus.textContent = "This browser does not support notifications.";
    els.enableNotificationsButton.hidden = true;
    els.enableNotificationsButton.disabled = true;
    els.notificationBellButton.classList.add("is-blocked");
    els.notificationBellButton.title = "This browser does not support notifications.";
    els.notificationBellButton.setAttribute("aria-label", "This browser does not support notifications.");
    return;
  }

  const status = Notification.permission;
  els.notificationStatus.textContent = status === "granted"
    ? "Notifications are on."
    : status === "denied"
      ? "Notification permission is blocked."
      : "Waiting for browser permission.";
  els.enableNotificationsButton.hidden = status !== "default";
  els.enableNotificationsButton.disabled = status !== "default";
  els.notificationBellButton.classList.add(status === "granted" ? "is-on" : status === "denied" ? "is-blocked" : "is-off");
  els.notificationBellButton.title = els.notificationStatus.textContent;
  els.notificationBellButton.setAttribute("aria-label", els.notificationStatus.textContent);
}

function toggleNotificationChat() {
  if (els.notificationChat.classList.contains("hidden")) {
    openNotificationChat();
  } else {
    closeNotificationChat();
  }
}

function openNotificationChat() {
  updateNotificationStatus();
  els.notificationChat.classList.remove("hidden");
}

function closeNotificationChat() {
  els.notificationChat.classList.add("hidden");
}

function moveCursor(amount) {
  if (state.view === "day") state.cursor = addDays(state.cursor, amount);
  if (state.view === "week") state.cursor = addDays(state.cursor, amount * 7);
  if (state.view === "month") state.cursor = new Date(state.cursor.getFullYear(), state.cursor.getMonth() + amount, 1);
  if (state.view === "year") state.cursor = new Date(state.cursor.getFullYear() + amount, 0, 1);
  render();
}

function getRangeForView() {
  if (state.view === "day") return { start: startOfDay(state.cursor), end: endOfDay(state.cursor) };
  if (state.view === "week") return { start: startOfWeek(state.cursor), end: endOfDay(addDays(startOfWeek(state.cursor), 6)) };
  if (state.view === "year") return { start: new Date(state.cursor.getFullYear(), 0, 1), end: new Date(state.cursor.getFullYear(), 11, 31, 23, 59, 59) };
  return { start: startOfMonth(state.cursor), end: endOfMonth(state.cursor) };
}

function rangeLabel() {
  if (state.view === "day") return formatLongDate(state.cursor);
  if (state.view === "week") {
    const start = startOfWeek(state.cursor);
    const end = addDays(start, 6);
    return `${formatShortDate(start)} - ${formatShortDate(end)}`;
  }
  if (state.view === "year") return `${state.cursor.getFullYear()}`;
  return state.cursor.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

function setDefaultFormDates(baseDate = new Date()) {
  const selected = new Date(baseDate);
  const hasChosenTime = selected.getHours() !== 0 || selected.getMinutes() !== 0;
  const start = hasChosenTime
    ? new Date(selected)
    : isSameDay(selected, new Date())
      ? new Date()
      : new Date(selected.getFullYear(), selected.getMonth(), selected.getDate(), 10, 0);
  if (!hasChosenTime && isSameDay(selected, new Date())) {
    start.setMinutes(start.getMinutes() < 30 ? 30 : 0, 0, 0);
    if (start.getMinutes() === 0) start.setHours(start.getHours() + 1);
  }
  const end = new Date(start.getTime() + 60 * 60000);
  els.start.value = toInputDateTime(start);
  els.end.value = toInputDateTime(end);
  els.category.value = "saglik";
  els.reminder.value = "15";
  els.repeat.value = "none";
}

function seedDemoEvents() {
  const now = new Date();
  const todayAt15 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 15, 0);
  const events = [
    makeEvent("Dentist appointment", todayAt15, 60, "saglik", "Arrive at the clinic 10 min early.", 15, "none"),
    makeEvent("Elif's birthday", new Date(now.getFullYear(), 8, 12, 9, 0), 60, "sosyal", "Do not forget the gift.", 1440, "yearly"),
    makeEvent("Weekly workout", addDays(todayAt15, 2), 90, "spor", "", 60, "weekly"),
    makeEvent("Focus work", addDays(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 0), 1), 120, "is", "", 15, "none"),
  ];

  state.events = state.events.concat(events);
  persistEvents();
  render();
}

function makeEvent(title, start, durationMinutes, category, notes, reminderMinutes, repeat) {
  return {
    id: createId(),
    title,
    start: start.toISOString(),
    end: new Date(start.getTime() + durationMinutes * 60000).toISOString(),
    category,
    notes,
    reminderMinutes,
    repeat,
    createdAt: new Date().toISOString(),
  };
}

function loadEvents() {
  try {
    return JSON.parse(localStorage.getItem(storageKey)) || [];
  } catch {
    return [];
  }
}


function normalizeStoredRoutines(routines) {
  const defaultsById = new Map(defaultRoutines.map((routine) => [routine.id, routine]));
  return routines.map((routine) => {
    const defaultRoutine = defaultsById.get(routine.id);
    if (!defaultRoutine) return routine;
    return {
      ...defaultRoutine,
      ...routine,
      title: routine.title || defaultRoutine.title,
      notes: routine.notes || defaultRoutine.notes,
    };
  });
}
function loadRoutines() {
  try {
    const stored = JSON.parse(localStorage.getItem(routinesStorageKey));
    return Array.isArray(stored) ? normalizeStoredRoutines(stored) : [...defaultRoutines];
  } catch {
    return [...defaultRoutines];
  }
}

function loadRoutineCompletions() {
  try {
    const stored = JSON.parse(localStorage.getItem(routineCompletionsStorageKey));
    return stored && typeof stored === "object" ? stored : {};
  } catch {
    return {};
  }
}

function loadWeekNotes() {
  try {
    const stored = JSON.parse(localStorage.getItem(weekNotesStorageKey));
    return stored && typeof stored === "object" ? stored : {};
  } catch {
    return {};
  }
}

function loadRemoteHolidayCache() {
  try {
    const stored = JSON.parse(localStorage.getItem(remoteHolidayStorageKey));
    return stored && typeof stored === "object" ? stored : {};
  } catch {
    return {};
  }
}

function loadRemoteHolidayFailures() {
  try {
    const stored = JSON.parse(localStorage.getItem(remoteHolidayFailuresStorageKey));
    return stored && typeof stored === "object" ? stored : {};
  } catch {
    return {};
  }
}

function loadTheme() {
  try {
    return localStorage.getItem(themeStorageKey) === "dark" ? "dark" : "light";
  } catch {
    return "light";
  }
}

function loadLanguage() {
  try {
    return localStorage.getItem(languageStorageKey) === "tr" ? "tr" : "en";
  } catch {
    return "en";
  }
}

function loadHolidayCountryOverride() {
  try {
    const value = localStorage.getItem(holidayCountryStorageKey) || "";
    return value === "AUTO" ? "" : value;
  } catch {
    return "";
  }
}

function persistEvents() {
  localStorage.setItem(storageKey, JSON.stringify(state.events));
}

function persistRoutines() {
  localStorage.setItem(routinesStorageKey, JSON.stringify(state.routines));
}

function persistRoutineCompletions() {
  localStorage.setItem(routineCompletionsStorageKey, JSON.stringify(state.routineCompletions));
}

function persistWeekNotes() {
  localStorage.setItem(weekNotesStorageKey, JSON.stringify(state.weekNotes));
}

function persistRemoteHolidays() {
  localStorage.setItem(remoteHolidayStorageKey, JSON.stringify(state.remoteHolidays));
}

function persistRemoteHolidayFailures() {
  localStorage.setItem(remoteHolidayFailuresStorageKey, JSON.stringify(state.remoteHolidayFailures));
}

function createId() {
  if (window.crypto?.randomUUID) return window.crypto.randomUUID();
  return `event-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function getEventsForDay(events, day) {
  const start = startOfDay(day);
  const end = endOfDay(day);
  return events.filter((event) => rangesOverlap(new Date(event.start), new Date(event.end), start, end));
}

function withVisibleRange(event, rangeStart, rangeEnd) {
  const start = new Date(event.start);
  const end = new Date(event.end);
  return {
    ...event,
    visibleStart: new Date(Math.max(start.getTime(), rangeStart.getTime())),
    visibleEnd: new Date(Math.min(end.getTime(), rangeEnd.getTime())),
  };
}

function getScheduledRoutinesForDay(day) {
  const dayStart = startOfDay(day);
  const dayEnd = endOfDay(day);
  return getEventsForDay(getOccurrences(dayStart, dayEnd), day)
    .map((event) => {
      const routine = getRoutineForEvent(event);
      if (!routine) return null;
      const visible = withVisibleRange(event, dayStart, dayEnd);
      const start = visible.visibleStart;
      const end = visible.visibleEnd;
      return {
        completionId: getRoutineCompletionId(event),
        legacyCompletionId: getRoutineLegacyCompletionId(event),
        id: event.routineId || event.originalId || event.id,
        title: event.title,
        time: formatSlotTime(start.getHours(), start.getMinutes()),
        durationMinutes: Math.max(5, Math.round((end - start) / 60000)),
        category: event.category,
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.time.localeCompare(b.time));
}

function getRoutineForEvent(event) {
  if (event.source === "routine") return event;
  if (event.routineId && state.routines.some((routine) => routine.id === event.routineId)) return event;
  return state.routines.find((routine) => routine.title === event.title && event.notes === routine.notes);
}

function getRoutineCompletionId(event) {
  return event.originalId || event.id || event.routineId;
}

function getRoutineLegacyCompletionId(event) {
  return event.routineId && event.routineId !== getRoutineCompletionId(event) ? event.routineId : "";
}

function getRoutineCompletionIds(event) {
  return [getRoutineCompletionId(event), getRoutineLegacyCompletionId(event)];
}

function isRoutineDone(routineId, date) {
  if (!routineId) return false;
  return Boolean(state.routineCompletions[`${dateKey(date)}-${routineId}`]);
}

function isAnyRoutineCompletionDone(routineIds, date) {
  return routineIds.filter(Boolean).some((routineId) => isRoutineDone(routineId, date));
}

function minuteFromSlotPointer(event, slotBody) {
  if (!slotBody) return 0;
  const rect = slotBody.getBoundingClientRect();
  if (rect.height <= 0) return 0;
  const ratio = Math.min(0.98, Math.max(0, (event.clientY - rect.top) / rect.height));
  return Math.min(55, Math.round((ratio * 60) / 5) * 5);
}

function setRoutineDone(routineId, date, isDone) {
  if (!routineId) return;
  const key = `${dateKey(date)}-${routineId}`;
  if (isDone) {
    state.routineCompletions[key] = true;
  } else {
    delete state.routineCompletions[key];
  }
  persistRoutineCompletions();
}

function setRoutineDoneIds(routineIds, date, isDone) {
  const ids = routineIds.filter(Boolean);
  if (isDone) {
    setRoutineDone(ids[0], date, true);
    return;
  }
  ids.forEach((routineId) => setRoutineDone(routineId, date, false));
}

function totalHours(events) {
  return events.reduce((sum, event) => sum + Math.max(0, new Date(event.end) - new Date(event.start)) / 3600000, 0);
}

function nextRepeatDate(date, repeat) {
  const next = new Date(date);
  if (repeat === "daily") next.setDate(next.getDate() + 1);
  if (repeat === "weekly") next.setDate(next.getDate() + 7);
  if (repeat === "monthly") next.setMonth(next.getMonth() + 1);
  if (repeat === "yearly") next.setFullYear(next.getFullYear() + 1);
  return next;
}

function rangesOverlap(startA, endA, startB, endB) {
  return startA < endB && endA > startB;
}

function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function endOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
}

function startOfWeek(date) {
  return addDays(startOfDay(date), -((date.getDay() + 6) % 7));
}

function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function endOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);
}

function addDays(date, days) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function daysInMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

function isSameDay(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function toInputDateTime(date) {
  const pad = (value) => String(value).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function dateKey(date) {
  const pad = (value) => String(value).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function parseDateKey(value) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function nthWeekdayOfMonth(year, month, weekday, ordinal) {
  if (ordinal === -1) {
    const last = new Date(year, month + 1, 0);
    const offset = (last.getDay() - weekday + 7) % 7;
    return new Date(year, month, last.getDate() - offset);
  }
  const first = new Date(year, month, 1);
  const offset = (weekday - first.getDay() + 7) % 7;
  return new Date(year, month, 1 + offset + (ordinal - 1) * 7);
}

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function formatTime(date) {
  return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
}

function formatSlotTime(hour, minute) {
  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

function formatTimeRange(start, end) {
  return `${formatTime(start)}-${formatTime(end)}`;
}

function formatLongDate(date) {
  return date.toLocaleDateString("en-US", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}

function formatHeaderDateTime(date) {
  const dateText = date.toLocaleDateString("en-US", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const timeText = date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  return `${dateText} - ${timeText}`;
}

function formatShortDate(date) {
  return date.toLocaleDateString("en-US", { day: "numeric", month: "short" });
}

function formatHours(hours) {
  if (hours < 1 && hours > 0) return `${Math.round(hours * 60)} min`;
  return `${Number(hours.toFixed(1))} hours`;
}

function formatMinutes(minutes) {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest === 0 ? `${hours} hours` : `${hours} hours ${rest} min`;
}

function weekDayNames() {
  return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
}

function reminderLabel(minutes) {
  if (minutes === 0) return "At start time";
  if (minutes < 60) return `${minutes} min before`;
  if (minutes === 60) return "1 hour before";
  if (minutes === 1440) return "1 day before";
  return `${minutes} min before`;
}

function repeatLabel(repeat) {
  return {
    none: "One-time",
    daily: "Repeats every day",
    weekly: "Repeats every week",
    monthly: "Repeats every month",
    yearly: "Repeats every year",
  }[repeat] || "One-time";
}



function registerServiceWorker() {
  if (!("serviceWorker" in navigator) || location.protocol === "file:") return;
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch((error) => {
      console.warn("Service worker registration failed", error);
    });
  });
}

