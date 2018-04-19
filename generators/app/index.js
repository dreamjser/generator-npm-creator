'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the extraordinary ' + chalk.red('generator-npm-creator') + ' generator!'
    ));

    const prompts = [{
      name: 'packageName',
      message: 'Input Your Package Name'
    },{
      name: 'description',
      message: 'Input Your Description'
    },{
      name: 'authorName',
      message: 'Input Your Name',
      default: this.user.git.name()
    },{
      name: 'authorEmail',
      message: 'Input Your Email',
      default: this.user.git.email()
    }];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
    const tplPaths = ['package.json', 'webpack.config.js'];
    const props = this.props;

    // copy all to destinationPath
    this.fs.copy(
      this.templatePath('**'),
      this.destinationPath(),
      {
        globOptions: {
          dot: true
        }
      }
    );

    tplPaths.forEach(el => {
      this._copyTpl(el, props);
    });

    this._writeSrc(props.packageName);
  }

  _copyTpl(tplPath, props) {
    this.fs.copyTpl(
      this.templatePath(tplPath),
      this.destinationPath(tplPath),
      {
        packageName: props.packageName,
        description: props.description,
        authorName: props.authorName,
        authorEmail: props.authorEmail
      }
    );
  }

  _writeSrc(packageName) {
    const path = `src/${packageName}.js`;
    this.fs.write(path, '');
  }

  install() {
    this.installDependencies({ bower: false });
  }

  end() {
    this.log('Project created completely');
  }
};
