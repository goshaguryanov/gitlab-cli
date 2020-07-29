# Gitlab CLI

Simple cli tool for using gitlab api through command line.

## Usage

```
npm install @kickass-dev/gitlab-cli
```

Configure CLI
```
gitlab-cli init YOUR_GITLAB_ACCESS_TOKEN https://gitlab.com
```

Use
```
gitlab-cli variable-create PROJECT_ID HOMEPAGE_URL https://kickass.website
```
or as alias
```
gitlab variable-create PROJECT_ID VARIABLE_NAME
```

You can find your Project ID inside your GitLab repository:
![Where is my Project ID](https://github.com/capJavert/gitlab-cli/raw/master/images/where-is-my-project-id.jpg "Where is my Project ID")

You can check [Creating a personal access token](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html#creating-a-personal-access-token) for information on how to generate your GitLab access token.

This will create configuration file at `~/.gitlabcli/config` and use it for all other commands.

Configuration can be overwritten by calling init command again.

## Help

gitlab-cli [command]

Commands:
  gitlab-cli init [token] [baseUrl]         Configure cli for usage
  gitlab-cli variable-list [projectId]      List variables for project
  gitlab-cli variable-get [projectId]       Print variable content
  [name]
  gitlab-cli variable-create [projectId]    Create new variable
  [name] [value]
  gitlab-cli variable-update [projectId]    Update variable value
  [name] [value]
  gitlab-cli variable-delete [projectId]    Remove variable
  [name]

Options:
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

## Support

Currently supports:
- [x] Variables

There are plans to support other resources available on [API Docs | GitLab](https://docs.gitlab.com/ee/api/README.html)
