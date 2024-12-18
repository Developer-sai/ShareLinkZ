@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --card: 0 0% 100%;
  --card-foreground: 222.2 84% 4.9%;
  --popover: 0 0% 100%;
  --popover-foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96.1%;
  --secondary-foreground: 222.2 47.4% 11.2%;
  --muted: 210 40% 96.1%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --accent: 210 40% 96.1%;
  --accent-foreground: 222.2 47.4% 11.2%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 210 40% 98%;
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --ring: 222.2 84% 4.9%;
  --radius: 0.5rem;
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --card: 222.2 84% 4.9%;
  --card-foreground: 210 40% 98%;
  --popover: 222.2 84% 4.9%;
  --popover-foreground: 210 40% 98%;
  --primary: 210 40% 98%;
  --primary-foreground: 222.2 47.4% 11.2%;
  --secondary: 217.2 32.6% 17.5%;
  --secondary-foreground: 210 40% 98%;
  --muted: 217.2 32.6% 17.5%;
  --muted-foreground: 215 20.2% 65.1%;
  --accent: 217.2 32.6% 17.5%;
  --accent-foreground: 210 40% 98%;
  --destructive: 0 62.8% 30.6%;
  --destructive-foreground: 210 40% 98%;
  --border: 217.2 32.6% 17.5%;
  --input: 217.2 32.6% 17.5%;
  --ring: 212.7 26.8% 83.9%;
}

body {
  @apply bg-background text-foreground;
}

.card {
  @apply bg-card text-card-foreground;
}

.button-primary {
  @apply bg-primary text-primary-foreground hover:bg-primary/90;
}

.input-primary {
  @apply bg-background border-input text-foreground;
}

.link-card:hover {
  @apply bg-accent;
}

/* Ensure input placeholders are visible in dark mode */
.dark input::placeholder,
.dark textarea::placeholder {
  @apply text-muted-foreground;
}

/* Ensure typed text is visible in dark mode */
.dark input,
.dark textarea {
  @apply text-foreground;
}

.dark .text-gray-700 {
  @apply text-gray-300;
}

.dark .text-gray-500 {
  @apply text-gray-400;
}

.dark .bg-white {
  @apply bg-gray-800;
}

.dark .border-gray-200 {
  @apply border-gray-700;
}

/* Accessibility improvements */
.sr-only {
  @apply absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0;
}

:focus-visible {
  @apply outline-2 outline-offset-2 outline-ring;
}

/* Improved button styles for better touch targets on mobile */
@media (max-width: 640px) {
  .button-primary,
  .button-secondary {
    @apply min-h-[44px];
  }
}

/* Priority indicator styles */
.priority-indicator {
  @apply w-3 h-3 rounded-full inline-block mr-2;
}

.priority-low {
  @apply bg-green-500;
}

.priority-medium {
  @apply bg-yellow-500;
}

.priority-high {
  @apply bg-red-500;
}

/* Archive indicator styles */
.archived-indicator {
  @apply text-sm text-muted-foreground flex items-center mt-1;
}

.archived-indicator svg {
  @apply mr-1;
}

/* Collaboration styles */
.collaboration-indicator {
  @apply text-sm text-blue-500 flex items-center mt-1;
}

.collaboration-indicator svg {
  @apply mr-1;
}

/* Activity feed styles */
.activity-feed {
  @apply max-h-[300px] overflow-y-auto;
}

.activity-item {
  @apply p-2 border-b border-border;
}

.activity-item:last-child {
  @apply border-b-0;
}

.activity-timestamp {
  @apply text-xs text-muted-foreground;
}

