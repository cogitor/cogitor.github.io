---
title: Code as Product
date: 2025-11-15
tags: [product development, platform engineering, developer productivity]
layout: post
description: I've been thinking a lot lately about how we build software, not for external customers, but for ourselves—for other developers.
sitemap:
  lastmod: 2025-11-15
  priority: 0.3
  changefreq: 'yearly'
---

I've been thinking a lot lately about how we build software, not for external customers, but for ourselves—for other developers. It's a subtle shift in perspective, but treating our internal code, our platforms, and our APIs as ["products"](https://thenewstack.io/platform-engineering-demands-a-product-mindset/) can fundamentally change the way we work for the better. This is at the core of [Platform Engineering](https://platformengineering.org/talks-library/platform-as-a-product).

<!--break-->

## From Project to Product

The traditional "project" mindset often focuses on delivering a discrete piece of work and moving on, sometimes overlooking the long-term impact on developer productivity for future features. In contrast, the "product" mindset views code as a living system that requires ongoing care and evolution. When you treat code as a product, you're not just shipping a feature; you're taking ownership of a living system.

This means thinking about your users. In this case, your users are your fellow developers. What are their pain points? What would make their lives easier? How can you build something that they'll not only use but *enjoy* using?

This user-centric approach is the heart of the "Code as Product" mindset. It's about applying the discipline of [product management](https://release.com/blog/use-product-thinking-to-establish-your-idp) to our internal development practices.

## The Developer as the Customer

So, what does this look like in practice? It starts with empathy.

*   **Effortless Onboarding:** When a new developer joins, the goal is to increase the confidence and reduce the time of their first meaningful contribution. This starts with choosing the language and frameworks that are most commonly used and easiest for new contributors to pick up, leveraging existing organizational knowledge. A great internal product then builds on this with clear setup instructions and documentation that anticipates their first questions. The benefit is twofold: the new developer feels productive and confident sooner, and the team gains a contributing member faster.

*   **Extensibility and the "Golden Path":** Beyond the initial setup, we need to think about common contribution patterns to existing services, APIs, or libraries. How do developers add a new feature to an existing service, extend an API, or contribute to a shared library? The "Golden Path" is about identifying these frequent workflows and building well-designed APIs, code interfaces, and clear guidelines to make these contributions incredibly simple and efficient. This isn't about restricting creativity, but about removing cognitive overhead and ensuring consistency. By making the best way the easiest way, we free up developers to focus their energy on solving unique business problems, not on navigating complex or undocumented contribution processes.

*   **Testing and Reliability:** A product needs to be reliable. For an internal tool, this means providing a robust testing framework. Developers should be able to add their own integrations and be confident that they haven't broken anything. This means providing extensive unit and end-to-end test examples that they can build upon.

*   **Documentation as a Feature:** Good documentation isn't an afterthought; it's a core feature of the product. We should document common patterns and provide clear examples. In an era of LLM-assisted code generation, this is more important than ever. Good documentation is not just for humans; it's for the tools that should help us write code faster and more efficiently.

## Measure, Iterate, and Evangelize

A product doesn't stand still, and neither should our internal tools. Treating code as a product means committing to its lifecycle. This involves a continuous loop of feedback, measurement, and improvement.

*   **Measure What Matters:** How do we know if our internal product is successful? We need to measure its impact. This could be through developer satisfaction surveys, tracking adoption rates of a new library, or even looking at engineering velocity metrics like the DORA metrics. The goal is to gather concrete data to understand what's working and what's not.

*   **Iterate Based on Feedback:** This data creates a powerful feedback loop. It allows us to move beyond assumptions and make informed decisions about where to invest our efforts. We can prioritize the features and improvements that will have the most significant impact on developer productivity and happiness.

*   **Evangelize and Drive Adoption:** A great internal product is only valuable if people use it. We need to become evangelists for our own tools. This means "marketing" them internally—communicating the value proposition, writing clear release notes, and actively encouraging adoption. By celebrating our internal products and their successes, we can build a culture of continuous improvement and shared ownership.

## A New Way of Thinking

Adopting a "Code as Product" mindset isn't about adding more process or bureaucracy. As engineers, we take pride in our craft. This mindset channels that pride in a new direction. Instead of being protective of our code, we should be proud that others want to use and extend it. The ultimate measure of our work's quality becomes the experience of the next developer. Are they happy? Are they productive?

It's about moving from a reactive, ticket-based approach to a proactive, value-driven one, where the value is measured by the success of our fellow developers. By thinking of our internal code as a product, we can build a more robust, maintainable, and enjoyable development ecosystem for everyone.
