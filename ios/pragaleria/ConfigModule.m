#import <Foundation/Foundation.h>
#import "ConfigModule.h"

@implementation ConfigModule

RCT_EXPORT_MODULE();

+(BOOL)requiresMainQueueSetup {
  return NO;
}

- (NSDictionary *)constantsToExport
{
  NSString* appName = [[NSBundle mainBundle] objectForInfoDictionaryKey:@"CFBundleDisplayName"];
  NSNumber* isDebug = [[NSBundle mainBundle] objectForInfoDictionaryKey:@"is_debug"];
  return @{
           @"APP_NAME": appName,
           @"IS_DEBUG": isDebug
           };
}

@end