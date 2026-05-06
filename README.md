# TV Time Stats

A personal web application built to analyze and visualize my personal TV viewing statistics. This project was created specifically to run as a containerized app on my personal NAS powered by [ZimaOS](https://www.zimaspace.com/zimaos).

## 🚀 Overview

TV Time Stats connects to an external MySQL database containing my viewing history to generate insights such as:

- Total episodes and hours watched.
- Monthly and annual averages.
- Personal viewing records (e.g., maximum episodes watched in a single month).
- Year-by-year breakdown of viewing habits.

_Note: The database itself is not provided in this repository, as it is populated and hosted in a separate container on my ZimaOS NAS._

## 🛠️ Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Charts:** [Recharts](https://recharts.org/) & [shadcn/ui](https://ui.shadcn.com/)
- **Database:** MySQL (via `mysql2` connector)
- **Deployment:** Docker (multi-stage build optimized for production)

## 📦 Installation on ZimaOS

Because this app was designed exclusively for ZimaOS, it is fully containerized. Here is how to install and configure it on your NAS.

### Prerequisites

- A running instance of ZimaOS.
- An existing MySQL/MariaDB container running on the NAS with the database `tv-time-stats` created and populated with your data. The database must include the expected views (like `stats_all_time_view` and `stats_by_year_view`).

### ZimaOS Web UI (Custom App)

1. Click the **+** button in the top left and select **Install a customized app**.
2. Configure the app:
    - **Image:** `ghcr.io/ciro9320/tv-time-stats:latest`
    - **App Name:** TV Time Stats
    - **Icon:** _(Optional URL to an icon)_
    - **Web UI:** Port `3000`
    - **Port Map:** `3000` (Host) -> `3000` (Container)
3. Add the following **Environment Variables** (matching your MySQL setup):
    - `MYSQL_HOST`: your database host
    - `MYSQL_USER`: your database user
    - `MYSQL_PASSWORD`: your database password
    - `MYSQL_DATABASE`: your database name
4. Click **Install/Save**. The app will now appear on your ZimaOS dashboard.

## 💻 Local Development

If you wish to modify the application locally before deploying to the NAS:

1. Clone the repository and install dependencies:
    ```bash
    npm install
    ```
2. Create a `.env` file in the root directory and add your database credentials:
    ```env
    MYSQL_HOST=localhost
    MYSQL_USER=root
    MYSQL_PASSWORD=secret
    MYSQL_DATABASE=tv-time-stats
    ```
3. Run the development server:
    ```bash
    npm run dev
    ```
4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
