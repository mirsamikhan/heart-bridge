# How to Add a New Blog Post (No Coding Required!)

Follow these simple steps directly on GitHub using your web browser. You do not need to install any software or use a command line.

---

## Step 1: Go to the Blog Folder on GitHub

1. Open this repository on [GitHub](https://github.com/mirsamikhan/heart-bridge).
2. Click into the folders: **`src`** ➔ **`content`** ➔ **`blog`**.
   *(Direct path: `src/content/blog`)*

---

## Step 2: Create a New File

1. Near the top right of the file list, click the **"Add file"** button.
2. Select **"Create new file"** from the dropdown menu.

---

## Step 3: Name Your File

In the box labeled **"Name your file..."**, type your article title using lowercase letters and hyphens instead of spaces, ending with `.md`.

* **Good examples:**
  * `healthy-eating-habits.md`
  * `heart-screening-day-recap.md`
  * `5-tips-for-better-sleep.md`

*(The filename becomes part of the website address: e.g., `/blog/healthy-eating-habits`)*

---

## Step 4: Copy and Paste the Template

Copy the template below and paste it directly into the large text area:

```markdown
---
title: "Your Article Title Goes Here"
date: "2026-10-01"
author: "Your Name or DilSe Team"
excerpt: "A short 1 to 2 sentence summary of your post that appears on the blog cards."
image: "https://example.com/photo.jpg"
---

Write your opening paragraph here. This is the start of your article body.

## First Main Point

Add your detailed thoughts, stories, or advice here.

* You can create bullet lists like this
* Just start each line with an asterisk and a space
* Another bullet point

## Second Main Point

You can write more text here. To make text **bold**, put two asterisks around it: `**bold text**`.

To add a link to another website, write: `[Click here](https://example.com)`.

## Conclusion

Wrap up your post with a friendly closing thought or next steps for readers!
```

---

## Step 5: Fill in Your Article Details

Customize the fields at the very top (between the `---` lines):

* **`title`**: The full title displayed at the top of your post. Keep quotation marks around it.
* **`date`**: Publication date in `YYYY-MM-DD` format (e.g., `2026-10-01`).
* **`author`**: Your name, physician name, or "DilSe Team".
* **`excerpt`**: A brief 1–2 sentence teaser shown on the main Blog overview page.
* **`image`** *(Optional)*: An image link for the cover photo.
  * **Option A (Web link):** Paste any public image URL (e.g., `https://images.unsplash.com/...`).
  * **Option B (Leave blank / remove):** If you don't have an image, you can delete the `image:` line entirely—the website will automatically display a clean icon header!
  * **Option C (Upload an image to GitHub):** Go to `public/` in the repository, click **"Add file"** > **"Upload files"**, upload your image (e.g., `my-photo.jpg`), and set `image: "/my-photo.jpg"`.

Write your full article below the second `---` line. You can use standard paragraphs, headings (starting with `##`), and bullet points.

---

## Step 6: Save and Publish (Commit)

1. Scroll down to the bottom of the page to the **"Commit changes..."** section.
2. In the commit message box, you can type something simple like:
   `Add new blog post: Your Article Title`
3. Make sure **"Commit directly to the `main` branch"** is selected.
4. Click the green **"Commit changes"** button.

---

## 🎉 That’s It!

Once you click **Commit changes**, GitHub automatically builds the website.

Your new post will show up automatically on the website at `/blog` within **1 to 2 minutes**—no code editing or technical maintenance needed!
