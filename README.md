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

## Support

Currently supports:
- [x] Variables

There are plans to support other resources available on [API Docs | GitLab](https://docs.gitlab.com/ee/api/README.html)
