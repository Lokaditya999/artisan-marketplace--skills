CREATE TABLE `artisans` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`bio` text,
	`story` text,
	`profile_image` text,
	`specialization` text,
	`location` text,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `courses` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`category` text,
	`instructor_id` integer,
	`thumbnail` text,
	`price` integer NOT NULL,
	`duration` text,
	`level` text,
	`created_at` text NOT NULL,
	FOREIGN KEY (`instructor_id`) REFERENCES `artisans`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`price` integer NOT NULL,
	`image` text,
	`category` text NOT NULL,
	`description` text,
	`artisan_id` integer,
	`created_at` text NOT NULL,
	FOREIGN KEY (`artisan_id`) REFERENCES `artisans`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `videos` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`video_url` text NOT NULL,
	`thumbnail` text,
	`category` text,
	`artisan_id` integer,
	`type` text,
	`views` integer DEFAULT 0,
	`created_at` text NOT NULL,
	FOREIGN KEY (`artisan_id`) REFERENCES `artisans`(`id`) ON UPDATE no action ON DELETE no action
);
