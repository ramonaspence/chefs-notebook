## Using a Traditional Dev Environment


<b>Step 1</b> - Fork the Repository on GitHub

['Forking'](https://help.github.com/articles/about-forks/) is a step where you get your own copy of the **Chef's Notebook** repository (a.k.a repo) on GitHub.

This is essential as it allows you to work on your own copy of **Chef's Notebook**. It allows you to request changes to be pulled into the **Chef's Notebook** repository from your fork via a pull request.

Follow these steps to fork the repository:
1. Go to the [Chef's Notebook repository on GitHub](https://github.com/ramonaspence/chefs-notebook).
2. Click the "Fork" Button in the upper right-hand corner of the interface [Need help?](https://help.github.com/articles/fork-a-repo/).
3. After the repository has been forked, you will be taken to your copy of the **Chef's Notebook** repository at `https://github.com/YOUR_USER_NAME/chefs-notebook`.


<b>Step 2</b> - Prepare the Terminal and Git Environment

**Prerequisite**:  All `commands` will be run within a terminal's command line / shell on your development device. Options vary by operating system.

* Linux - the pre-installed terminal, usually running a _bash_ or _sh_ shell, should work in its default "out of the box" configuration.
* Mac - the pre-installed _Terminal_ in MacOS, usually running a zsh shell, should work in its default "out of the box" configuration.
* Windows - options for running a Linux terminal and shell within Windows include:
    * [Windows Subsystem Linux with Linux (WSL)](https://docs.microsoft.com/en-us/windows/wsl/install-win10#manual-installation-steps) with a Linux distribution, such as [_Ubuntu 20.04 for Windows_](https://ubuntu.com/tutorials/ubuntu-on-windows) or [other supported Linux distributions](https://docs.microsoft.com/en-us/windows/wsl/install-win10#step-6---install-your-linux-distribution-of-choice).
        > Note: [Windows Terminal](https://www.microsoft.com/en-us/p/windows-terminal/) is an **optional** terminal interface tool. It can only open a Linux shell if WSL and a Linux distro already exist.
    * _Git Bash_ - this terminal shell emulates Linux and is included in _Git for Windows_. It works, but is more likely to have permission errors or minor inconsistencies.

**Prerequisites**: [Git](https://git-scm.com/downloads) must exist (run ``git --version`` to check) within your development terminal / shell.

1. Decide if you will [authenticate to GitHub using SSH or HTTPS](https://docs.github.com/en/github/authenticating-to-github/about-authentication-to-github#authenticating-with-the-command-line).
    * SSH - uses SSH key authentication instead of a username and password.
    * HTTPS - uses a GitHub username and [personal access token (PAT)](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token).  For security, use a PAT instead of a GitHub password.

2. Change directories (`cd`) to wherever you want the **Chef's Notebook** project to be downloaded by Git.
    > Note: Windows using WSL + a Linux distro maintains its own file system. Use a sub-directory within the Linux /home/username/ filesystem path. The alternative, using a directory within _C:\_ or _/mnt/c_, will cause everything to run very slowly.

3. [Clone](https://docs.github.com/en/github/getting-started-with-github/about-remote-repositories) your GitHub fork of **Chef's Notebook** using the SSH or HTTP method you selected above. Replace _YOUR_USER_NAME_ with your GitHub username.

    * [SSH method](https://docs.github.com/en/github/getting-started-with-github/about-remote-repositories#cloning-with-ssh-urls) - `git clone git@github.com:YOUR_USER_NAME/chefs-notebook.git`
    * [HTTPS method](https://docs.github.com/en/github/getting-started-with-github/about-remote-repositories#cloning-with-https-urls) - `git clone https://github.com/YOUR_USER_NAME/chefs-notebook.git`
 
     This command will download the entire Git repository fork into a sub-directory named _chefs-notebook_ inside of the current directory. Your forked repository of code will be referred to as the _origin_ . 

4. Configure the [**Chef's Notebook**](https://github.com/ramonaspence/chefs-notebook) repository as the _upstream_. Doing this allows you to regularly synchronize code changes from the _upstream_ to your _origin_ fork.

    ```sh
    cd chefs-notebook
    git remote add upstream https://github.com/ramonaspence/chefs-notebook.git
    ```

5. Ensure the _origin_ and _upstream_ configuration is correct:

    ```sh
    git remote -v
    ```

    The output should look something like below:

        origin    https://github.com/YOUR_USER_NAME/chefs-notebook.git (fetch)
        origin    https://github.com/YOUR_USER_NAME/chefs-notebook.git (push)
        upstream    https://github.com/ramonaspence/chefs-notebook.git (fetch)
        upstream    https://github.com/ramonaspence/chefs-notebook.git (push)

<b>Step 3</b> - Decide Whether to Run the Application Now, or Later

It's possible to contribute simple changes, like to README.md, without running the application. However, for many situations you will need to get the application running to view pages, see your code in action, and test changes.  

If you want to proceed immediately with running the client, database, and server, then continue onto the steps below.

<details>
<summary>Install Django Rest Framework and ReactJS</summary>

Since Django is a Python framework, you will need Python installed on your machine. If you don't already have Python installed, download the latest version at https://www.python.org/downloads/.
Then verify the installation by typing and entering `python` in your terminal.

You should see an output similar to this:

```
  Python 3.6.13 |Anaconda, Inc.| (default, Feb 23 2021, 12:58:59) 
  [GCC Clang 10.0.0 ] on darwin
  Type "help", "copyright", "credits" or "license" for more information.
  >>> 
```

To install Django with Pip:
```
  $ python -m pip install Django
```

To run the React app in **Chef's Notebook**, first confirm that you have Node.js and npm installed by checking their versions:
```
  $ node -v
  $ npm -v
```

If you don't have Node.js and npm installed, you can read how to do that at [right here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm#using-a-node-installer-to-install-nodejs-and-npm)
</details>

<details>
<summary>Create environment variables</summary>  

For this step you'll need to create [AWS account and access keys](https://docs.aws.amazon.com/powershell/latest/userguide/pstools-appendix-sign-up.html). This link will provide detailed instructions on how to get those. 

**Note: the files created in this step should be added to a `.gitignore` file so that you do not commit them to your forked repository.**

Create a new file inside your fork's main folder called _.env_. Inside of it, you'll store your AWS account and access keys, like so:
```
   AWS_ACCESS_KEY_ID = XXXXXXXXXXX
   AWS_SECRET_ACCESS_KEY = XXXXXXXXXXXXXX
```

`Cd` into the _frontend/static_ folder and create another file called `.env`. Here we'll store a base URL for the React app to run on.

For your dev environment, use localhost:
```
   REACT_APP_BASE_URL = http://localhost:8000

```
</details>
<details>
<summary>Setup a Django environment</summary>

There are a few commands to run before starting the application itself.

First, install packages from Pipfile:
```
  $ pipenv install
```

Then, activate the Pipenv shell:
```
  $ pipenv shell
```
Learn more about basic operations from [Pipenv documentation](https://pipenv-fork.readthedocs.io/en/latest/basics.html).
</details>
<details>
<summary>Running the application</summary>


There's one last thing you need to do to setup Django and that's [applying migrations](https://docs.djangoproject.com/en/4.0/ref/django-admin/#django-admin-migrate).

To do that, run:
```
  $ python manage.py migrate
``` 

Now you can run the django application using:
```
  $ python manage.py runserver
```

In order to run the React app, open a new tab in your terminal. `Cd` into _frontend/static_.

You'll need to install dependencies from the project's `package.json`
```
   $ npm install
```
And compile the app:  
_Note: In order for this to work with current Node and Webpack versions you'll also need to run:_
```
   $ export NODE_OPTIONS=--openssl-legacy-provider
```
then:
```
   $ npm run build
```


```
  $ npm start
```
</details>
<details>
<summary>Testing the application</summary>  

So you've added new code or updated existing code. Now it's time to test the application. Running tests is a critical step and can protect the application from regression. 

To run tests, use command:
```
python manage.py test
```

If you've added code it may be necessary to also test this code. To find out what needs to be tested, use coverage.py. 

```
coverage erase && coverage run manage.py test -v 3 && coverage report
```

This command will erase any past reports, run tests, and then output a coverage report showing what percentage of what files is being tested. This report should be at 100% for all files. 

If something is below 100% and it's code that you've contributed, then that code needs to be tested. 

Once the test coverage is at 100% and all tests are passing, you're ready to push your code to your fork! 
</details></br>
<b>Step 4</b> - Creating a Pull Request

There's one last step. Once you've pushed your code to your fork of **Chef's Notebook**, you'll see an option on your repo's page that tells you there's been recent pushes to 

1. A yellow message bar should appear on the top of your GitHub fork page (https://github.com/YOUR_USER_NAME/chefs-notebook) after you've committed & pushed changes to a branch on your fork. Follow the green _Compare and Pull Request_ button to open a new "Open a pull request" form page.

2. The _main_ branch of the [Chef's Notebook](https://github.com/ramonaspence/chefs-notebook) should automatically show as being [compared with](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request-from-a-fork) your proposed changes, like:
    > [base repository: ramonaspence/chefs-notebook] [base:main] **<-** [your fork] [your proposed branch]

3. Write a [descriptive title](https://contribute.freecodecamp.org/#/how-to-open-a-pull-request?id=prepare-a-good-pr-title) in the title field. A common pattern you may like to follow is: _**Type**(optional **scope**): With a Thoughtful Title_.
    > * Example: _feat(client): Send Email on RSVP Confirmation_
    > * **Type** examples
    >   * chore: Changes that are not related to code, tests, or docs.
    >   * docs: Changes to the contributing guidelines, etc.
    >   * feat: A new feature
    >   * fix: A bug fix
    >   * refactor: A code change that neither fixes a bug nor adds a feature
    >   * test: Changes related to tests
    > * **(Scope)** examples: api, build, ci, client, db, perf, style, ui 

4. Write a more detailed explaination of the changes in the form's text area.
    > The text area will automatically include a checklist of items to confirm before submitting the pull request.

    > At the end of your PR's description, you may append a pattern like `Closes #1337` to tell GitHub to automatically close a specific issue number when the PR is accepted and merged.

Submit the form and you have successfully created a PR. Congratulations!


Huge thanks to [Chapter](https://github.com/freeCodeCamp/chapter) for providing the basis for this CONTRIBUTING.md. I couldn't have done it without referencing and borrowing their [CONTRIBUTING.md](https://github.com/freeCodeCamp/chapter/blob/main/CONTRIBUTING.md).

