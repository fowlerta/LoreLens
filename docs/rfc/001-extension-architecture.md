# RFC-001 Extension Architecture

## Goal

Create a browser extension that works on any webpage.

## Components

- Content Script
- Background Service Worker
- Tooltip UI
- Dictionary Engine

## Communication

Content Script
↓

Event Bus

↓

Dictionary Engine

↓

Tooltip

## Why?

Keeps business logic independent from UI.