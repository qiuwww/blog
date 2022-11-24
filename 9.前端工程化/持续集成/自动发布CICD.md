# CICD

CI / CD 的采用改变了开发人员和测试人员如何发布软件。

最初是瀑布模型，后来是敏捷开发，现在是 DevOps，这是现代开发人员构建出色的产品的技术路线。随着 DevOps 的兴起，出现了持续集成（**Continuous Integration**）、持续交付（**Continuous Delivery**） 、持续部署（**Continuous Deployment**） 的新方法。

## 持续集成

的重点是将各个开发人员的工作集合到一个代码仓库中。通常，每天都要进行几次，主要目的是尽早发现集成错误，使团队更加紧密结合，更好地协作。

## 持续交付

的目的是最小化部署或释放过程中固有的摩擦。它的实现通常能够将构建部署的每个步骤自动化，以便任何时刻能够安全地完成代码发布（理想情况下）。

## 持续部署

是一种更高程度的自动化，无论何时对代码进行重大更改，都会自动进行构建/部署。

最受欢迎的自动化工具是 Jenkins，Jenkins 是一个比较流行的持续集成工具。

### GitHub Actions

是 GitHub 的持续集成服务，于 2018 年 10 月推出

**持续集成**由很多操作组成，比如抓取代码、运行测试、登录远程服务器，发布到第三方服务等等。

GitHub 注意到了这一点，想出了一个很妙的点子，允许开发者把每个操作写成独立的脚本文件，存放到代码仓库，使得其他开发者可以引用。

### GitHub Actions 有一些自己的术语

（1）workflow （工作流程）：持续集成一次运行的过程，就是一个 workflow。
（2）job （任务）：一个 workflow 由一个或多个 jobs 构成，含义是一次持续集成的运行，可以完成多个任务。
（3）step（步骤）：每个 job 由多个 step 构成，一步步完成。
（4）action （动作）：每个 step 可以依次执行一个或多个命令（action）。

GitHub Actions 的配置文件叫做 workflow 文件，**存放在代码仓库的.github/workflows 目录。**

[GitHub 操作的工作流程语法](https://help.github.com/cn/actions/automating-your-workflow-with-github-actions/workflow-syntax-for-github-actions)

## [使用 GitLab 实现 CI/CD](https://zhuanlan.zhihu.com/p/136843588)

<https://www.jianshu.com/p/2ed650d705dc>

**一旦你已经添加了.gitlab-ci.yml 到仓库中，GitLab 将检测到该文件，并使用名为 GitLab Runner 的工具运行你的脚本**。该工具的操作与终端类似。

1. 添加.gitlab-ci.yml；
2. 提交这个文件；
3. 配置一个 Runner；
   1. 在 GitLab 中，Runner 运行你定义在.gitlab-ci.yml 中的作业（job）
   2. 一个 Runner 可以是一个虚拟机、物理机、docker 容器，或者一个容器集群
   3. GitLab 与 Runner 之间通过 API 进行通信，因此只需要 Runner 所在的机器有网络并且可以访问 GitLab 服务器即可
   4. 设置 Runner
      1. GitLab runner 是一个构建实例，用于在多台机器上运行作业，并将结果发送到 GitLab，并可将其放置在单独的用户，服务器和本地计算机上。
4. Kubernetes cluster?
   1. 是一个开源的容器编排引擎，用来对容器化应用进行自动化部署、 扩缩和管理。
