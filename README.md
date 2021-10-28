# Gitlab CLI

[![npm](https://img.shields.io/npm/v/@kickass-dev/gitlab-cli)](https://www.npmjs.com/package/@kickass-dev/gitlab-cli)

Simple cli tool for using gitlab api through command line.

## Setup

```
npm install -g @kickass-dev/gitlab-cli
```

Configure CLI
```
gitlab-cli init YOUR_GITLAB_ACCESS_TOKEN https://gitlab.com
```

You can check [Creating a personal access token](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html#creating-a-personal-access-token) for information on how to generate your GitLab access token.

You can find your Project ID inside your GitLab repository:
![Where is my Project ID](https://github.com/capJavert/gitlab-cli/raw/master/images/where-is-my-project-id.jpg "Where is my Project ID")

This will create configuration file at `~/.gitlabcli/config` and use it for all other commands.

Configuration can be overwritten by calling init command again.

## Usage

### Create variable

```
gitlab-cli variable-create PROJECT_ID HOMEPAGE_URL https://kickass.website
```

Instead of value you can also provide relative file path. In that case contents of the file
will be used as variable value.
```
gitlab-cli variable-create PROJECT_ID HOMEPAGE_URL ../path/to/my/env/file
```

### Get variable

With this you can easily pull for example .env that you store inside your gitlab project for local development:
```
gitlab-cli variable-get PROJECT_ID ENV_FILE > .env
```

or value by value:
```
gitlab-cli variable-get PROJECT_ID HOMEPAGE_URL >> .env
gitlab-cli variable-get PROJECT_ID API_BASE >> .env
```

### Create pipeline

```
> gitlab-cli pipeline-create 646 feature/cache
Pipeline #21807 created and running...
```

### Cancel or retry pipeline

```
gitlab-cli pipeline-update 646 21807 retry
gitlab-cli pipeline-update 646 21807 cancel
```

### List runners for project

```
> gitlab-cli runner-list 646
33 frontend ONLINE 255.255.32.197
738 macosrunner ONLINE 255.255.14.247
1655 azure-runner ONLINE 255.255.154.234
1798 k6-runner PAUSED 255.255.255.152
```

### Enable or disable runner for project

```
gitlab-cli runner-enable 646 33
gitlab-cli runner-disable 646 33
```

**You can find other commands with examples and usages in the Help section below.***

## Help

Get full list of commands:

```
gitlab-cli --help
```

Get help for specific command:

```
gitlab-cli [command] --help
```

### Options:
  --help     Show help                                                 [boolean]  
  --version  Show version number                                       [boolean]  

## FAQ
* How do I create a variable with multiline content?

Just wrap variable value in quotation marks like:
```
gitlab-cli variable-update 646 EDITOR_CONFIG "root = true

[*]
end_of_line = lf
insert_final_newline = true
indent_style = space
indent_size = 4"
``` 
or load your variable value from file by providing file path instead of value.

* I wish to output original (JSON) response from Gitlab API, how can I do that?

Every command supports global `--raw` option, use it like:
```
gitlab-cli pipeline-list 646 --raw
```

This will output original JSON string received from Gitlab API. You can use it to parse it
by yourself or pipe to some other command for processing (for example inside CI/CD job).

## Support

### Currently supported
- [x] Variables
- [x] Pipelines
- [x] Runners

### Next
- [ ] Issues
- [ ] Releases


There are plans to support other resources available on [API Docs | GitLab](https://docs.gitlab.com/ee/api/README.html)
