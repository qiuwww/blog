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

GitHub Actions 的配置文件叫做 workflow 文件，**存放在代码仓库的.github/workflows目录。**

[GitHub 操作的工作流程语法](https://help.github.com/cn/actions/automating-your-workflow-with-github-actions/workflow-syntax-for-github-actions)
