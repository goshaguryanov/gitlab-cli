# Gitlab CLI

Simple cli tool for using gitlab api through command line.

## Usage

```
npm install -g @kickass-dev/gitlab-cli
```

Configure CLI
```
gitlab-cli init YOUR_GITLAB_ACCESS_TOKEN https://gitlab.com
```

You can check [Creating a personal access token](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html#creating-a-personal-access-token) for information on how to generate your GitLab access token.

Use
```
gitlab-cli variable-create PROJECT_ID HOMEPAGE_URL https://kickass.website
```

Instead of value you can also provide relative file path. In that case contents of the file
will be used as variable value.
```
gitlab-cli variable-create PROJECT_ID HOMEPAGE_URL ../path/to/my/env/file
```

You can find your Project ID inside your GitLab repository:
![Where is my Project ID](https://github.com/capJavert/gitlab-cli/raw/master/images/where-is-my-project-id.jpg "Where is my Project ID")

This will create configuration file at `~/.gitlabcli/config` and use it for all other commands.

Configuration can be overwritten by calling init command again.

## Help

gitlab-cli [command]

### Commands:  
  gitlab-cli init [token] [baseUrl]         Configure cli for usage  
  gitlab-cli variable-list [projectId]      List variables for project  
  gitlab-cli variable-get [projectId] [name]       Print variable content  
  gitlab-cli variable-create [projectId] [name] [value]    Create new variable  
  gitlab-cli variable-update [projectId] [name] [value]    Update variable value  
  gitlab-cli variable-delete [projectId] [name]    Remove variable  

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

## Support

Currently supports:
- [x] Variables

There are plans to support other resources available on [API Docs | GitLab](https://docs.gitlab.com/ee/api/README.html)
