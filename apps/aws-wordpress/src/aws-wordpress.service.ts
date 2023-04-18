import { Injectable } from '@nestjs/common';
import {
  CloudFormationClient,
  CreateStackCommand,
  CreateStackCommandInput,
  ListStackResourcesCommand,
  ListStackResourcesCommandInput,
  DescribeStacksCommand,
  DescribeStacksCommandInput,
  DescribeStacksCommandOutput,
} from '@aws-sdk/client-cloudformation';
@Injectable()
export class AwsWordpressService {
  client = new CloudFormationClient({ region: 'us-east-1' });
  async run(): Promise<void> {
    // const stack = await this.createStack();
    // console.log(stack);
    let result: DescribeStacksCommandOutput;
    while (true) {
      console.log('here');
      await new Promise((resolve) => setTimeout(resolve, 5000));
      console.log('here1');
      result = await this.DescribeStacks();
      console.log(result);
      console.log('here2');

      console.log(result?.Stacks[0]?.Outputs);
      if (result?.Stacks[0]?.Outputs) break;
    }
  }

  async DescribeStacks() {
    const params: DescribeStacksCommandInput = {
      StackName: 'AzionWordpress',
    };

    const command = new DescribeStacksCommand(params);

    return await this.client.send(command);
  }
  async listStack() {
    const params: ListStackResourcesCommandInput = {
      StackName: 'AzionWordpress',
    };

    const command = new ListStackResourcesCommand(params);

    return await this.client.send(command);
  }

  async createStack() {
    const params: CreateStackCommandInput = {
      StackName: 'AzionWordpress',
      TemplateURL:
        'https://azion-infrastructure-templates.s3.sa-east-1.amazonaws.com/wordpress.json',
      Parameters: [
        {
          ParameterKey: 'KeyName',
          ParameterValue: 'AzionWordpress',
          UsePreviousValue: false,
        },
        {
          ParameterKey: 'DBPassword',
          ParameterValue: 'abc12345',
          UsePreviousValue: false,
        },
        {
          ParameterKey: 'DBUser',
          ParameterValue: 'azion',
          UsePreviousValue: false,
        },
        {
          ParameterKey: 'DBRootPassword',
          ParameterValue: 'abc12345',
          UsePreviousValue: false,
        },
      ],
    };
    const command = new CreateStackCommand(params);

    return await this.client.send(command);
  }
}
