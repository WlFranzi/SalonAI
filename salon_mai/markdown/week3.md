# Couch to 5K for AI — Week 3: Build Your First Skill

**Source:** https://couchto5k.ai

---

Made by [Hilary Gridley](https://www.linkedin.com/in/hilarygridley/) 
[Newsletter →](https://hils.substack.com) [Course →](https://maven.com/hilary-gridley/ai-powered-people-management)

 

![Couch to 5K for AI](/couch-to-5k-for-ai.svg) 
# Couch to 5K for AI
 
30 days of ten-minute exercises to get you from chatting to building with AI.
 Grab a workout buddy. Share with your team →
 

## Lock in your race
 
Pick a date to publicly demo something you build in 30 days. This commitment will keep you accountable to your training.
 

Commit to get optional calendar invites.
 Commit

 

## Your 30 days of training
 4 weeks · 30 exercises
 
Week 1 Set the Bar High Week 2 Onboard Your Chief of Staff Week 3 Build Your First Skill Week 4 Put AI to Work
 

## Week 3: Build Your First Skill
 
Give Claude a skill that takes work off your plate immediately.

 

 Day 15 Teach AI Who You Work With
 

Claude can help you prep for conversations, draft messages, and think through tricky dynamics - but only if it knows who the people are. Today you'll create a profile for one person you work with closely. Now that Claude has access to your email, it can pull from real conversations to make the profile richer.
 
1. 
Open the Claude desktop app and navigate to Claude Code. Select the context directory folder in the folder switcher.

 
2. 
If you haven't already today, say "plan my day" and run through that flow to create your daily note. These daily notes will come in handy later.

 
3. 
Change [name] in the prompt below to someone you work with who is not your manager. Then copy the prompt and paste it into Claude.

 

Paste this prompt
 

Create a profile for in team/. Ask me 5 questions about this person that will help you better coach me on working with them. Also check my recent email threads with them and add any observations. Then create the file.
 Copy

 
4. 
Answer the questions.

 
5. 
Use the profile right away. Paste the prompt below.

 

Paste this prompt
 

I have with about . Using their profile, help me think through how to approach it.
 Copy

 
6. 
Read the prep. If something is off (wrong tone, missing context, bad assumption about this person), tell Claude and say "update the profile so you don't make that mistake next time."

 
7. 
Paste the prompt below to make sure profiles stay up to date automatically.

 

Paste this prompt
 

Add an instruction to my CLAUDE.md: whenever we work on something involving a person who has a profile, update their profile with anything that would help you better understand this person. Use your judgment about what's worth keeping. I shouldn't have to ask you to do this.
 Copy

 
You're done for the day. Tomorrow: profiling your manager.
 

Key Takeaway
 
When AI knows who someone is, it can help you communicate with them better. And corrections stick - you fix it once, it's fixed forever.

 ✓ Mark Day 15 complete

 

 Day 16 Profile Your Manager
 

Yesterday you told the AI about a peer. Today you're going to do the same thing for your manager, and then use that profile to build a weekly update that actually lands. But first, Claude needs to know who your manager is. If you don't have a manager, just choose someone you work closely with.
 
1. 
Before you start, gather some raw material. Find one or two of these:

 

- A piece of feedback your manager has given you (an email, a review, Slack message, anything)
- Their LinkedIn profile (take a screenshot or copy the text).
- A recent email thread between you and your manager

 
2. 
Open the Claude desktop app and navigate to Claude Code. Select the context directory folder in the folder switcher.

 
3. 
Paste the prompt below, then paste or drag in whatever material you gathered. Hit Enter.

 

Paste this prompt
 

Create a profile for my manager in my-manager/. I'm going to paste in some material about them. Based on what I give you and any email threads you can find between us, write a profile that covers: what they care about, how they like to receive information, what they tend to push back on, and what "good work" looks like to them. Show me the profile and ask me to confirm before saving.
 Copy

 
4. 
Review the profile. If you disagree with anything, type or dictate that feedback to Claude and hit Enter.

 
5. 
Keep going until the profile feels mostly right. Then tell Claude you’re done — something like “That looks good, save it.”

 
You're done for the day. Tomorrow: building your weekly update using this profile.
 

Key Takeaway
 
The more Claude knows about who you're communicating with, the better it can help you communicate with them.

 ✓ Mark Day 16 complete

 

 Day 17 Automate Your Weekly Update
 

Most people send some kind of weekly update to their manager. Even if you don't have a manager, a weekly reflection is still a helpful practice. Over the next few days, you're going to build a skill that writes yours. Claude already knows who your manager is and what they care about.
 
1. 
Open the Claude desktop app and navigate to Claude Code. Select the context directory folder in the folder switcher.

 

Paste this prompt
 

Read my manager's profile. I want to build a skill that writes my weekly update for them. Based on what you know about my manager - their role, what they care about, how they like to receive information - what would an excellent weekly update to this person look like? Be specific about structure, tone, level of detail, and what to include vs. leave out.
 Copy

 
2. 
Read the response. Give any additional feedback if you have it.

 
3. 
Paste the prompt below to build the skill.

 

Paste this prompt
 

Build a first version of the skill so I can invoke it with /weekly-update. It should pull from my daily notes, my calendar, my email, and my manager's profile to write the update.
 Copy

 
4. 
Try it right now. Type /weekly-update and see what it produces.

 
**Slash command not showing up?** First, try restarting your Claude app. If that still doesn't work, the skill should still trigger from natural language — just say "weekly update" or "make my weekly update" instead.
 
You're done for the day. Tomorrow: improving it with feedback.
 

Key Takeaway
 
AI writes better for a specific audience when it knows who that audience is. Your manager's profile shapes the output.

 ✓ Mark Day 17 complete

 

 Day 18 Improve It with Feedback
 

The skill exists. Today you run it, rewrite it in your own voice, and teach Claude what you changed.
 
1. 
Open the Claude desktop app and navigate to Claude Code. Select the context directory folder in the folder switcher.

 

Paste this prompt
 

Run /weekly-update for this week.
 Copy

 
2. 
Read the output.

 
3. 
Rewrite it the way you would actually send it. Change the tone, cut what doesn't matter, add what's missing.

 
4. 
Paste your rewritten version into the chat, followed by the prompt below.

 

After pasting your rewrite
 

I took your update and rewrote it. This is closer to what I'd actually send. What changes would you make to the skill to account for the differences?
 Copy

 
5. 
Read through the proposed changes. If they look right, tell Claude to update the skill.

 
You're done for the day. Tomorrow: shipping your first AI update.
 

Key Takeaway
 
When you rewrite AI's output and feed those edits back, the skill gets sharper. Your corrections become its instructions.

 ✓ Mark Day 18 complete

 

 Day 19 Share What You Built
 

As important as building with AI is, it's equally important to learn how to talk about it with other people. Today you're going to disclose how you're using AI - the role AI is playing, the role you're playing, and why it matters.
 
1. 
Open the Claude desktop app and navigate to Claude Code. Select the context directory folder in the folder switcher.

 

Paste this prompt
 

Run /weekly-update for this week.
 Copy

 
2. 
Review it and make any final edits. Then send it to your manager with a short note explaining your new process. Something like:

 

Example message
 

Hey - I'm trying a new system where I use AI to draft my weekly updates. It pulls from my calendar, notes, and email to put together a first draft, and then I review and edit before sending. I take accountability for anything I send you, so I’ve looked at it and put my stamp of approval on it before it lands on your desk. I wanted to be transparent about how I'm using AI. Let me know if you have any concerns or if there's anything you'd want me to change about the format.
 Copy

 
People ask, "If AI did the work, should I take credit for it?" Just disclose how you use it. Say AI helped, but you stand by the output. You're accountable for it. That's what matters.
 
You're done for the day. Tomorrow: seeing what AI has learned about you.
 

Key Takeaway
 
Be transparent about how you use AI and take accountability for the output of that work.

 ✓ Mark Day 19 complete

 

 Day 20 See What AI Learned About You
 

You've been using the system for two weeks. Claude has your daily notes, your reminders, your calendar, your email, and people profiles. Today might be the most eye-opening exercise so far.
 
1. 
Open the Claude desktop app and navigate to Claude Code. Select the context directory folder in the folder switcher.

 

Paste this prompt
 

Read all my daily notes, my reminders, my calendar from the past two weeks, and my CLAUDE.md. I want you to be honest with me:

1. What am I spending my time on vs. what I say my priorities are? Do those match?
2. What keeps showing up on my reminders list that I never get to?
3. What patterns do you see in how I work that I might not notice myself?
 Copy

 
2. 
Review what Claude found. Add any color or feedback. Correct anything that's off, confirm what resonates.

 
3. 
Paste the prompt below and hit Enter.

 

Paste this prompt
 

Based on everything you've observed, write a preferences doc for me and save it to me/preferences.md. Don't ask me what my preferences are - tell me what you've observed them to be. Then add a line to my CLAUDE.md that says: "For tasks involving how I work, communicate, or plan, read me/preferences.md first."
 Copy

 
You didn't sit down and define your preferences. Claude figured them out from watching you work.
 
You're done for the day. Tomorrow: deciding what to automate.
 

Key Takeaway
 
AI can spot your patterns better than you can. It has the data without the blind spots.

 ✓ Mark Day 20 complete

 

 Day 21 Decide What to Automate
 

Not everything should be automated. Ask yourself: if I were 10x better at this, would it 10x my career or my life? If no, automate it and reclaim the time. If yes, that's a place to put effort into getting better. AI can help with that too, but it takes a different shape than automation.
 
1. 
Open the Claude desktop app and navigate to Claude Code. Select the context directory folder in the folder switcher.

 

Paste this prompt
 

Read everything in my context directory - my daily notes, reminders, calendar, team profiles, preferences, and the weekly update skill. Based on what you know about how I work, suggest two types of things to build:

1. Automations - repetitive tasks where being 10x better at them wouldn't change my life. AI should just handle these so I stop thinking about them.

2. Coaching tools - work where being 10x better would genuinely 10x my career or my life. For these, suggest tools that coach me, sharpen my inputs, or raise my bar - not ones that do the work for me.

Give me 5 in each category. For each one, tell me what it would do and what context it would pull from.
 Copy

 
2. 
Read both lists. Tell Claude which ones you're most interested in building.

 

Follow up with this
 

For my top picks, what context would you need from me that you don't already have?
 Copy

 
3. 
Answer any questions Claude has.

 
4. 
Paste the prompt below and hit Enter.

 

Paste this prompt
 

Save the full list of ideas as projects/skill-ideas.md so I can come back to it anytime.
 Copy

 
You now have a backlog. Next week, you pick one and build it.
 
You're done for the day. Next week: make it yours.
 

Key Takeaway
 
Be thoughtful about what you automate and what you continue to improve in yourself.

 ✓ Mark Day 21 complete

 
![Hilary Gridley](/hilary-bio-photo.webp) 

Hi, I'm Hilary. I teach leaders to use AI thoughtfully. If this has been useful, there's more:
 
[Subscribe to Writerbuilder →](https://hils.substack.com) [Take my Supermanagers course →](https://maven.com/hilary-gridley/ai-powered-people-management)

 

## FAQ
 

### Before you start
 
How is this different from other AI tutorials?
 
Who made this, and why should I trust them?
 
Do I need to know how to code?
 
If I don't code at work, why do I need a coding agent?
 
Do I need a paid Claude subscription?
 
Does this work on Windows?
 
Could I use Cursor or Codex instead?

 

### Key concepts
 
What is a .md file, and why am I using those?
 
Why does this program use local files on my computer?
 
What is a context directory and why do I need it?
 
What is a CLAUDE.md file?

 

### Tips & tools
 
Are there other tools you recommend?
 
How do I turn off Claude asking for permissions every time?