
## Fursa App

Fursa App is a mobile application aimed at connecting job seekers with employers, facilitating a streamlined process for job applications, and allowing employers to review candidate profiles and CVs directly. The app is built with [Expo](https://expo.dev/), providing compatibility across Android, iOS, and web platforms.

## Table of Contents
- [About](#about)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Development](#development)
- [Community and Resources](#community-and-resources)

## About

Fursa App provides a platform for:
- **Job Seekers**: Allows users to browse and apply for job postings, upload CVs, and create profiles for employers to review.
- **Employers**: Enables employers to post job listings, review applicants’ profiles, and access uploaded CVs to find suitable candidates.

The goal of Fursa is to make job opportunities accessible while simplifying the recruitment process for companies. 

## Features

- **Job Listings**: Job seekers can browse various job postings from registered employers.
- **CV Upload**: Job seekers have the ability to upload their CVs, making it easier for employers to view their qualifications.
- **Application Management**: Employers can track and review applicants for each job posting, enhancing hiring efficiency.
- **Profile Viewing**: Employers have access to detailed profiles of applicants, including CVs and relevant experience.

## Installation

To set up and run Fursa App locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/frashid17/fursa-app.git
   cd fursa-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

## Usage

Start the app with Expo by running:
```bash
npx expo start
```

After starting, you can choose how to view the app:
- **Development Build**: For running the app on local devices or simulators.
- **Android Emulator**: For Android testing.
- **iOS Simulator**: For iOS testing.
- **Expo Go**: View the app on a physical device via the [Expo Go](https://expo.dev/go) app.

## Development

### Directory Structure
- **app**: Primary application files, where you can start implementing new features or editing existing ones.
- **app-example**: Starter template that can be reset to start fresh, if needed.

The project leverages **file-based routing** for managing navigation within the app. 

### Fresh Project Setup
To reset the app to a clean state:
```bash
npm run reset-project
```
This command moves the starter code to `app-example` and prepares a blank `app` directory for new developments.

## Community and Resources

For guidance, community support, and contributions:
- **[Expo Documentation](https://docs.expo.dev/)**: Learn about Expo’s development tools and features.
- **[GitHub Expo](https://github.com/expo/expo)**: Engage with Expo's open-source community.
- **[Expo Discord](https://chat.expo.dev/)**: Connect with other Expo users and developers.

---

This project is actively maintained by [frashid17](https://github.com/frashid17) and welcomes contributions to improve and expand its functionality.

