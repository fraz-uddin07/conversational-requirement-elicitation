**Project:** Conversational Requirement Elicitation Tool for Reporting Domain 

**Context:** Priyamwada is a Business Analyst working for TATA AIG Insurance Company who receives too many report requests. She works with 13 departments - Underwriting, Claims, Actuarial, Sales and Marketing, Customer Service, Policy Administration, Finance and Accounting, Legal and Compliance, Information Technology (IT), Human Resources (HR), Risk Management, Reinsurance, Product Development. Each department requests for a new report on daily basis and it has become difficult for Priyamwada to categorize the reporting requirement. You are tasked to design a tool that helps Priyamwada to review the pre-curated reporting requirements using conversational requirement elicication tool for report requirements.

For example, Sushma - a Finance manager from Finance and Accounting department will be provide this tool to provide report requirement. Using conversations, the tool should probe and understand the Type of the report, visualization aspect of the report, filters required, any sub-reports, Graphs etc. Once the requirements are eliciated, the report requirement needs to be summarized so that Priyamwada can send the requirement specification directly to Data Engineers so that they can build and deliver report to Sushma.

**Input:** Priyamwada imports a meta-model that contains bare-minimum attributes to capture requirements for building reports. Sushma, asks questions to chat based tool which runs against underlying meta-model

**Output:** Summarization of Reporting requiremnets in plain english so that Priyamwada can work with Data Engineers to create Reports.

**Technology Stack:** HTML, CSS, JS for Web site with a Chat GUI for Sushma, Meta-model updater for Priyamwada to define bare-minimum aspects of Reporting domain so that the conversations can be contextualized.

**Chornology of Tasks:**
* Priyamwada creates a meta-model that contains bare-minimum aspects of reporting requests in JSON/XML format
* Sushma is exposed a Chat room that probes queries on reporting requirements using the underlying bare-minimum meta-model for reporting requests
* Once the elicitation is complete, the requirement needs to be summarized in plain English and should be sent to Priyamwada

**Stakeholders:**
* Priyamwada: Should be able to create a meta-model and upload it to the Tool
* Sushma: Should be able to converse with the tool and get her report requirement submited 

**Team Size:** 4 

**Point of Contact:** Sai Anirudh Karre (saianirudh.karre@iiit.ac.in) 