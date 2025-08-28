console.log("Playlist Builder startar...");

// Selecting HTML Elements
const form = document.querySelector("#track-form") as HTMLFormElement;
const titleInput = document.querySelector("#title") as HTMLInputElement;
const durationInput = document.querySelector("#duration") as HTMLInputElement;
const list = document.querySelector("#list") as HTMLUListElement;
const totalEl = document.querySelector("#total") as HTMLSpanElement;
const gengreInput = document.querySelector("#gengre") as HTMLSelectElement;

type Genre = "pop" | "rock" | "other";

interface Track {
  title: string;
  duration: number;
  isFavorite: boolean;
  gengre: string;
}

const tracks: Track[] = [];

function parseDuration(time: string): number | null {
  //   if (!time) return null;

  const [minutes, seconds] = time.split(":");
  const result = parseInt(minutes) * 60 + parseInt(seconds);

  return result;
}

function formatDuration(time: number) {
  const mintues = Math.floor(time / 60);
  const seconds = time % 60;
  return `${mintues}:${seconds.toString().padStart(2, "0")}`;
}
console.log(parseDuration("3:45"));
console.log(formatDuration(225));

function render() {
  list.innerHTML = "";
  let totalDuration = 0;

  tracks.forEach((item, index) => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    li.textContent = `${item.isFavorite ? "⭐️" : ""} ${
      item.title
    } (${formatDuration(item.duration)})  Gengre: [${item.gengre}]`;
    button.textContent = "🗑️";
    button.addEventListener("click", (e) => {
      tracks.splice(index, 1);
      render();
    });
    checkBox.addEventListener("click", () => {
      item.isFavorite = !item.isFavorite;
      render();
    });

    button.style.margin = "8px";
    li.appendChild(checkBox);
    li.appendChild(button);
    list.appendChild(li);
    totalDuration += item.duration;
  });
  totalEl.textContent = formatDuration(totalDuration);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  // 1. Läs titel och längd
  const title = titleInput.value;
  const duration = durationInput.value;
  // 2. Använd parseDuration
  const rightDuration = parseDuration(duration);
  // 3. Skapa ett Track-objekt
  const track: Track = {
    title: title,
    duration: rightDuration ?? 0,
    isFavorite: false,
    gengre: gengreInput.value as Genre,
  };
  // 4. Lägg till i tracks-arrayen
  tracks.push(track);
  // 5. Töm formuläret
  titleInput.value = "";
  durationInput.value = "";
  // 6. Anropa render()
  render();
});
