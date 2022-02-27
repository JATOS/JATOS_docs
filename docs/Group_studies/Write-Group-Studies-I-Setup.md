---
title: Write Group Studies I - Setup
slug: /Write-Group-Studies-I-Setup.html
sidebar_position: 2
---
import Hl from '@site/src/components/Highlight';

## Set up group studies

First and common to all group setups is to check the <Hl>Group study</Hl> checkbox in the study properties. 

![Group's property](/img/study-properties-group-study.png)

If the <Hl>Group</Hl> property is checked, JATOS will assign workers into groups. We'll describe some group properties that you can use to tweak according to whether you want to keep control over worker assignment, or you give JATOS full control.


### Group settings in each batch's properties

You can have multiple batches in JATOS, each one with different group settings. There are three important bits of information for a group study:

![Study Links screenshot](/img/batch_properties_groups.png)

1. **<Hl>Max total workers</Hl>**: This isn't just a properties of group studies. It simply limits the total amount of workers who are allowed to run in this batch.
1. **<Hl>Max total members</Hl>**:  This limits the number of members a single group can have. While there can be multiple groups in a batch, the <Hl>Max total members</Hl> field applies to each separate group. 
1. **<Hl>Max active members</Hl>**: This limits the number of active members a single group can have. An active member is in the group at this time - in opposite to a past member who already left the group. This number applies to each group separately. Example: In the <Hl>Prisoner's Dilemma</Hl> study, you would limit the active members to 2.

By default, all properties have no upper limit.


## Group assignment

You can either tell JATOS to assign workers to different groups, or you can keep full control and do it yourself (or something in between). We'll use some example scenarios to explain how this assignment works.

### Scenario 1: One group, assign workers manually

If in a batch you set the <Hl>Max total worker</Hl> to 2 and leave the other two Max parameters empty, JATOS has no other choice than to allow only 2 workers and sort them into the same group. If you then [create two Personal Single study links](Run-your-Study-with-Study-Links.html) (but other study link types are fine too) and send the links to your two participants, you can be sure that they will interact with each other. If you need more groups, just create a second batch with two other workers.

![Prisoners example](/img/prisoners_example.png)

The first two scenarios may apply to the [Prisoner's Dilemma Example Study](/Example-Studies).

### Scenario 2: Several groups, let JATOS assign workers

Say you want to have 3 groups with 2 workers each. You want to leave it to JATOS which workers are paired together. Then, set <Hl>Max total workers</Hl> to 6 and both <Hl>Max active members</Hl> and <Hl>Max total members</Hl> to 2 (remember that these numbers apply to each group separately). Then [create 6 Personal Single study links](Run-your-Study-with-Study-Links.html) (but other study link types are fine too) and send them to your 6 participants.

### Scenario 3: One open world

This scenario is basically the opposite of the first one. By limiting neither the <Hl>Max total worker</Hl> nor the <Hl>Max total members</Hl>, nor the <Hl>Max active members</Hl> JATOS will sort all workers into one single group that is potentially of unlimited size. Now --to keep it completely open-- just [create one study link type General Single](Run-your-Study-with-Study-Links.html) (but other study link types are fine too) and publish it (e.g. via a mailing list or on a website).

![Snake example](/img/snake_example.png)

The third and fourth scenario may apply to the [Snake Example Study](/Example-Studies).

### Scenario 4: Multiple open worlds with limited active members

Say you want to have groups with up to 3 members, interacting _at the same time_. But you don't want to actually limit the total number of members per group: you want to allow new workers to join a group if one of its members left. This way each group can have a flow of workers joining and leaving - the only constraint is the maximum members per group at any given time. You also want to let JATOS set the number of groups depending on the available workers. To set up this just use one batch, set the <Hl>Max active members</Hl> to 3, and leave <Hl>Max total worker</Hl> and <Hl>Max total members</Hl> unlimited.  
