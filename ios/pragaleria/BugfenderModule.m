#import <Foundation/Foundation.h>
#import <BugfenderSDK/BugfenderSDK.h>
#import "BugfenderModule.h"

BFLogLevel toLogLevel(NSString* lvl)
{
  if ([lvl isEqualToString:@"LOG_LEVEL_DEBUG"])
  {
    return BFLogLevelDefault;
  }
  else if ([lvl isEqualToString:@"LOG_LEVEL_WARNING"])
  {
    return BFLogLevelWarning;
  }
  else if ([lvl isEqualToString:@"LOG_LEVEL_ERROR"])
  {
    return BFLogLevelError;
  }
  else
  {
    return BFLogLevelDefault;
  }
}

@implementation BugfenderModule

RCT_EXPORT_MODULE();

+(BOOL)requiresMainQueueSetup {
  return NO;
}

RCT_EXPORT_METHOD(logDebug: (NSString*)tag message:(NSString*)message)
{
  [Bugfender logWithLineNumber: 0 method:@"" file:@"" level: BFLogLevelDefault tag:tag message:message];
}

RCT_EXPORT_METHOD(logWarning: (NSString*)tag message:(NSString*)message)
{
  [Bugfender logWithLineNumber: 0 method:@"" file:@"" level: BFLogLevelWarning tag:tag message:message];
}

RCT_EXPORT_METHOD(logError: (NSString*)tag message:(NSString*)message)
{
  [Bugfender logWithLineNumber: 0 method:@"" file:@"" level: BFLogLevelError tag:tag message:message];
}

RCT_EXPORT_METHOD(enableCrashReporting)
{
  [Bugfender enableCrashReporting];
}

RCT_EXPORT_METHOD(forceSendOnce)
{
  [Bugfender forceSendOnce];
}

RCT_EXPORT_METHOD(getDeviceIdentifier: (RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  resolve([Bugfender deviceIdentifier]);
}

RCT_EXPORT_METHOD(getSessionIdentifier: (RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  resolve([Bugfender sessionIdentifier]);
}

RCT_EXPORT_METHOD(log:(NSInteger)lineNumber method:(NSString*)method file:(NSString*)file logLevel:(NSString*)logLevel tag:(NSString*)tag messaage:(NSString*)message)
{
  [Bugfender logWithLineNumber:lineNumber method:method file:file level:toLogLevel(logLevel) tag:tag message:message];
}

RCT_EXPORT_METHOD(removeDeviceKey:(NSString*)key)
{
  [Bugfender removeDeviceKey:key];
}

RCT_EXPORT_METHOD(sendIssue:(NSString*)title text:(NSString*)text resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  resolve([Bugfender sendIssueWithTitle:title text:text]);
}

RCT_EXPORT_METHOD(setApiUri:(NSString*)url)
{
  [Bugfender setApiURL:[NSURL URLWithString:[url stringByAddingPercentEncodingWithAllowedCharacters:[NSCharacterSet URLPathAllowedCharacterSet]]]];
}

RCT_EXPORT_METHOD(setDeviceBoolean:(NSString*)key val:(BOOL)val)
{
  [Bugfender setDeviceBOOL:val forKey:key];
}

RCT_EXPORT_METHOD(setDeviceFloat:(NSString*)key val:(float)val)
{
  [Bugfender setDeviceDouble:val forKey:key];
}

RCT_EXPORT_METHOD(setDeviceInteger:(NSString*)key val:(UInt64)val)
{
  [Bugfender setDeviceInteger:val forKey:key];
}

RCT_EXPORT_METHOD(setDeviceString:(NSString*)key val:(NSString*)val)
{
  [Bugfender setDeviceString:val forKey:key];
}

RCT_EXPORT_METHOD(setForceEnabled:(BOOL)val)
{
  [Bugfender setForceEnabled:val];
}

RCT_EXPORT_METHOD(setMaximumLocalStorageSize:(NSUInteger)bytes)
{
  [Bugfender setMaximumLocalStorageSize:bytes];
}

- (NSDictionary *)constantsToExport
{
  return @{
           @"LOG_LEVEL_DEBUG": @"LOG_LEVEL_DEBUG",
           @"LOG_LEVEL_ERROR": @"LOG_LEVEL_ERROR",
           @"LOG_LEVEL_WARNING": @"LOG_LEVEL_WARNING"
           };
}

@end